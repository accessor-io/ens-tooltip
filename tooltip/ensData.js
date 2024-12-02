const { config, provider, requestTracker } = require('./config');

class ENSDataFetcher {
    constructor() {
        this.provider = provider;
        this.cache = new Map();
    }

    async fetchENSData(ensName) {
        try {
            // Check rate limiting
            if (!requestTracker.canMakeRequest()) {
                throw new Error('Rate limit exceeded. Please try again later.');
            }
            requestTracker.increment();

            // Check cache first
            const cachedData = this.getCachedData(ensName);
            if (cachedData) return cachedData;

            // ... rest of the fetching logic remains the same
        } catch (error) {
            console.error('Error fetching ENS data:', error);
            throw error;
        }
    }

    // ... rest of the class implementation remains the same
} 