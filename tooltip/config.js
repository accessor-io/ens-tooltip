ss// Configuration with environment variable fallback
const config = {
    infura: {
        projectId: process.env.INFURA_PROJECT_ID || '9e88fbe7e3cf4adba63f545158e31cfc',s
        network: 'mainnet',
        endpoints: {
            mainnet: `https://mainnet.infura.io/v3/9e88fbe7e3cf4adba63f545158e31cfc`
        }
    },
    rateLimit: {
        maxRequests: 100000, // Infura's default daily limit
        windowMs: 24 * 60 * 60 * 1000 // 24 hours
    },
    cache: {
        duration: 3600000 // 1 hour in milliseconds
    }
};

// Add request tracking
const requestTracker = {
    count: 0,
    resetTime: Date.now() + config.rateLimit.windowMs,
    
    increment() {
        if (Date.now() > this.resetTime) {
            this.count = 0;
            this.resetTime = Date.now() + config.rateLimit.windowMs;
        }
        this.count++;
    },
    
    canMakeRequest() {
        return this.count < config.rateLimit.maxRequests;
    }
};

// Update the ENSDataFetcher to use this configuration
const provider = new ethers.providers.InfuraProvider(
    config.infura.network,
    config.infura.projectId
);

// Export the configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        config,
        provider,
        requestTracker
    };
} else {
    window.ensConfig = config;
    window.ensProvider = provider;
} 