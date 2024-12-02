console.log('Plugin loaded');
class ENSTooltip {
    constructor(config) {
        console.log('ENSTooltip initialized with config:', config);
        this.config = config;
        this.provider = new ethers.providers.JsonRpcProvider(
            'https://mainnet.infura.io/v3/9e88fbe7e3cf4adba63f545158e31cfc'
        );
        this.cache = new Map();
        this.cacheTimeout = config.cacheTimeout || 3600000;
        this.initializeTooltip();
    }

    async getENSData(ensName) {
        try {
            console.log('Starting ENS data fetch for:', ensName);
            
            // Check cache first
            const cachedData = this.cache.get(ensName);
            if (cachedData && (Date.now() - cachedData.timestamp) < this.cacheTimeout) {
                console.log('Using cached data for:', ensName);
                return cachedData.data;
            }

            // Fetch fresh data
            console.log('Fetching fresh data for:', ensName);
            const address = await this.provider.resolveName(ensName);
            console.log('Resolved address:', address);
            
            const resolver = await this.provider.getResolver(ensName);
            console.log('Got resolver:', resolver);
            
            if (!resolver) {
                console.log('No resolver found for:', ensName);
                return null;
            }

            const [avatar, contentHash, email, url, twitter] = await Promise.all([
                resolver.getText('avatar').catch(e => null),
                resolver.getContentHash().catch(e => null),
                resolver.getText('email').catch(e => null),
                resolver.getText('url').catch(e => null),
                resolver.getText('com.twitter').catch(e => null)
            ]);

            console.log('Fetched ENS data:', { avatar, contentHash, email, url, twitter });

            const data = {
                name: ensName,
                address,
                avatar,
                contentHash,
                email,
                url,
                twitter
            };

            // Store in cache
            this.cache.set(ensName, {
                data,
                timestamp: Date.now()
            });

            return data;
        } catch (error) {
            console.error('Error fetching ENS data:', error);
            return {
                name: ensName,
                error: 'Unable to load ENS data: ' + error.message
            };
        }
    }

    initializeTooltip() {
        console.log('Initializing tooltip');
        
        // Add hover listeners to all ENS names
        const ensElements = document.querySelectorAll('.ens-name');
        console.log('Found ENS elements:', ensElements.length, ensElements);

        ensElements.forEach(element => {
            console.log('Adding listeners to:', element.textContent);
            let tooltip = null;
            let tooltipTimeout = null;

            // Mouse enter event
            element.addEventListener('mouseenter', async (event) => {
                console.log('Mouse entered:', event.target.textContent);
                event.stopPropagation();
                
                // Clear any existing tooltip
                if (tooltip) {
                    tooltip.remove();
                    tooltip = null;
                }
                if (tooltipTimeout) {
                    clearTimeout(tooltipTimeout);
                }

                // Get ENS data
                const ensName = event.target.textContent.trim();
                console.log('Fetching data for:', ensName);
                const data = await this.getENSData(ensName);
                console.log('Received data:', data);
                
                if (data) {
                    // Create and position tooltip
                    tooltip = this.createTooltip(data);
                    document.body.appendChild(tooltip);
                    
                    const rect = element.getBoundingClientRect();
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
                    
                    tooltip.style.left = `${rect.left + scrollLeft}px`;
                    tooltip.style.top = `${rect.bottom + scrollTop + 5}px`;
                    console.log('Tooltip created and positioned');
                }
            });

            // Mouse leave event
            element.addEventListener('mouseleave', (event) => {
                console.log('Mouse left:', event.target.textContent);
                if (tooltip) {
                    tooltipTimeout = setTimeout(() => {
                        tooltip.remove();
                        tooltip = null;
                    }, 200);
                }
            });
        });
    }

    clearCache() {
        this.cache.clear();
    }

    removeExpiredCache() {
        const now = Date.now();
        for (const [key, value] of this.cache.entries()) {
            if (now - value.timestamp > this.cacheTimeout) {
                this.cache.delete(key);
            }
        }
    }

    createTooltip(data) {
        const tooltip = document.createElement('div');
        tooltip.className = 'ens-tooltip';
        
        if (data.error) {
            tooltip.innerHTML = `
                <div class="ens-tooltip-content">
                    <h3>${data.name}</h3>
                    <p class="ens-error">${data.error}</p>
                </div>
            `;
        } else {
            tooltip.innerHTML = `
                <div class="ens-tooltip-content">
                    ${data.avatar ? `
                        <div class="ens-avatar-container">
                            <img src="${data.avatar}" 
                                alt="${data.name}" 
                                class="ens-avatar"
                                width="128" 
                                height="128"
                                onerror="this.style.display='none'"
                            />
                        </div>
                    ` : ''}
                    <h3>${data.name}</h3>
                    <p class="ens-address">Address: ${data.address ? 
                        `${data.address.slice(0,6)}...${data.address.slice(-4)}` : 
                        'Not set'}</p>
                    ${data.twitter ? `<p class="ens-twitter">Twitter: @${data.twitter}</p>` : ''}
                    ${data.email ? `<p class="ens-email">Email: ${data.email}</p>` : ''}
                    ${data.url ? `<p class="ens-url">Website: ${data.url}</p>` : ''}
                </div>
            `;
        }
        return tooltip;
    }
}

// Initialize immediately when script loads
if (typeof window !== 'undefined') {
    window.ENSTooltip = ENSTooltip;
    console.log('ENSTooltip added to window');
} 