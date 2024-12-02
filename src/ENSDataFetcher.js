const { config, provider, requestTracker } = require('./config');

class ENSDataFetcher {
    constructor(options = {}) {
        this.provider = options.provider || provider;
        this.cache = new Map();
        this.cacheTimeout = options.cacheTimeout || 3600000; // 1 hour default
        this.maxRetries = options.maxRetries || 3;
        this.retryDelay = options.retryDelay || 1000; // 1 second
    }

    async fetchENSData(ensName) {
        if (!ensName || typeof ensName !== 'string') {
            throw new Error('Invalid ENS name provided');
        }

        try {
            // Check rate limiting
            if (!requestTracker.canMakeRequest()) {
                throw new Error('Rate limit exceeded. Please try again later.');
            }

            // Check cache first
            const cachedData = this.getCachedData(ensName);
            if (cachedData) return cachedData;

            // Attempt to fetch with retries
            const data = await this.fetchWithRetries(ensName);
            
            // Cache the successful response
            this.setCacheData(ensName, data);
            
            return data;

        } catch (error) {
            console.error('Error fetching ENS data:', error);
            throw this.normalizeError(error);
        }
    }

    async fetchWithRetries(ensName, attemptCount = 0) {
        try {
            requestTracker.increment();
            
            const resolver = await this.provider.getResolver(ensName);
            if (!resolver) {
                throw new Error('ENS name not found');
            }

            const [address, contentHash, avatar, email] = await Promise.all([
                resolver.getAddress(),
                resolver.getContentHash().catch(() => null),
                resolver.getText('avatar').catch(() => null),
                resolver.getText('email').catch(() => null)
            ]);

            return {
                address,
                contentHash,
                avatar,
                email,
                timestamp: Date.now()
            };

        } catch (error) {
            if (attemptCount < this.maxRetries) {
                await this.delay(this.retryDelay * (attemptCount + 1));
                return this.fetchWithRetries(ensName, attemptCount + 1);
            }
            throw error;
        }
    }

    getCachedData(ensName) {
        const cached = this.cache.get(ensName);
        if (!cached) return null;

        const isExpired = Date.now() - cached.timestamp > this.cacheTimeout;
        if (isExpired) {
            this.cache.delete(ensName);
            return null;
        }

        return cached;
    }

    setCacheData(ensName, data) {
        this.cache.set(ensName, {
            ...data,
            timestamp: Date.now()
        });
    }

    clearCache() {
        this.cache.clear();
    }

    normalizeError(error) {
        if (error.message.includes('rate limit')) {
            return new Error('Rate limit exceeded. Please try again later.');
        }
        if (error.message.includes('not found')) {
            return new Error('ENS name not found');
        }
        if (error.code === 'NETWORK_ERROR') {
            return new Error('Network error. Please check your connection.');
        }
        return new Error('Failed to fetch ENS data. Please try again.');
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Utility method to check if an ENS name is valid
    isValidENSName(ensName) {
        const ensNameRegex = /^[a-zA-Z0-9-]+\.eth$/;
        return ensNameRegex.test(ensName);
    }
}

module.exports = ENSDataFetcher; 