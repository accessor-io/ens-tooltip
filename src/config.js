/**
 * Default configuration for ENS Resolution
 * @typedef {Object} ENSConfig
 */
export const defaultConfig = {
    // RPC Configuration
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_ID',
    fallbackRpcUrls: [
        'https://eth-mainnet.alchemyapi.io/v2/YOUR_ALCHEMY_KEY',
        'https://rpc.ankr.com/eth/YOUR_ANKR_KEY'
    ],
    rpcConfig: {
        timeout: 10000,
        keepalive: true,
        maxSockets: 20,
        rateLimit: 100 // requests per minute
    },
    
    // DOM Selectors
    selector: '.ens-name',
    tooltipClass: 'ens-tooltip',
    tooltipOptions: {
        position: 'bottom',
        offset: 8,
        animation: true,
        animationDuration: 200,
        interactive: true,
        theme: 'default'
    },
    
    // Cache Settings
    cacheTimeout: 3600000, // 1 hour
    maxCacheEntries: 1000,
    persistCache: true,
    cacheStrategy: 'lru', // 'lru' | 'fifo' | 'lfu'
    cacheStorage: 'localStorage', // 'localStorage' | 'sessionStorage' | 'memory'
    
    // Display Options
    showAvatar: true,
    showAddress: true,
    showSocial: true,
    displayFormat: {
        address: 'truncated', // 'full' | 'truncated' | 'custom'
        truncateLength: 8,
        avatarSize: 32,
        socialIcons: true
    },
    
    // Theme Configuration
    theme: 'light',
    customThemes: {
        light: {
            background: '#ffffff',
            text: '#000000',
            border: '#e0e0e0',
            accent: '#3498db',
            error: '#e74c3c',
            success: '#2ecc71'
        },
        dark: {
            background: '#1a1a1a',
            text: '#ffffff',
            border: '#333333',
            accent: '#3498db',
            error: '#e74c3c',
            success: '#2ecc71'
        }
    },
    
    // Network Settings
    networkId: 1, // Mainnet
    ensContractAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    networkConfig: {
        autoSwitch: true,
        supportedNetworks: [1, 5], // Mainnet and Goerli
        fallbackNetwork: 1
    },
    
    // API Settings
    requestTimeout: 5000, // 5 seconds
    apiEndpoints: {
        metadata: 'https://api.example.com/metadata',
        avatar: 'https://api.example.com/avatar',
        social: 'https://api.example.com/social'
    },
    
    // Error Handling
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
    errorHandling: {
        fallbackToAddress: true,
        showErrorMessages: true,
        errorMessageDuration: 3000,
        customErrorMessages: {
            networkError: 'Unable to connect to network',
            resolveError: 'Could not resolve ENS name',
            timeout: 'Request timed out'
        }
    },
    
    // Logging and Monitoring
    debug: false,
    logLevel: 'error', // 'debug' | 'info' | 'warn' | 'error'
    monitoring: {
        enabled: true,
        sampleRate: 0.1, // 10% of requests
        errorTracking: true,
        performance: true,
        customMetrics: []
    },

    // Security
    security: {
        enableCSP: true,
        validateInputs: true,
        sanitizeHTML: true,
        maxRequestSize: 1024 * 1024, // 1MB
        rateLimiting: {
            enabled: true,
            maxRequests: 100,
            timeWindow: 60000 // 1 minute
        }
    },

    // Internationalization
    i18n: {
        enabled: true,
        defaultLocale: 'en',
        fallbackLocale: 'en',
        availableLocales: ['en', 'es', 'fr', 'de', 'ja'],
        loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
};