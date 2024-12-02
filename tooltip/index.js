class ENSTooltip {
    constructor(config) {
        this.config = {
            infuraProjectId: config.infuraProjectId,
            network: config.network || 'mainnet',
            preset: config.preset || 'completeProfile',
            cacheTimeout: config.cacheTimeout || 3600000 // 1 hour default
        };

        this.dataFetcher = new ENSDataFetcher(
            this.config.infuraProjectId,
            this.config.network
        );
        
        this.cache = new Map();
    }

    async getENSData(ensName) {
        // Check cache first
        const cachedData = this.getCachedData(ensName);
        if (cachedData) return cachedData;

        // Fetch fresh data
        const data = await this.dataFetcher.fetchENSData(ensName);
        
        // Cache the result
        this.cacheData(ensName, data);
        
        return data;
    }

    getCachedData(ensName) {
        const cached = this.cache.get(ensName);
        if (!cached) return null;

        // Check if cache is still valid
        if (Date.now() - cached.timestamp < this.config.cacheTimeout) {
            return cached.data;
        }

        // Remove expired cache
        this.cache.delete(ensName);
        return null;
    }

    cacheData(ensName, data) {
        this.cache.set(ensName, {
            data,
            timestamp: Date.now()
        });
    }

    // ... rest of your tooltip rendering logic
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ENSTooltip;
} else {
    window.ENSTooltip = ENSTooltip;
} 