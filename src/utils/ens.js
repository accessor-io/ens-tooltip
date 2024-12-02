/**
 * Fetches comprehensive ENS data for a given ENS name
 * @param {ethers.Provider} provider - Ethereum provider instance
 * @param {string} ensName - ENS name to resolve (e.g., 'vitalik.eth')
 * @returns {Promise<Object|null>} ENS data object or null if not found/error
 */
export async function fetchENSData(provider, ensName) {
    // Input validation
    if (!provider || !ensName) {
        console.error('Invalid provider or ENS name');
        return null;
    }

    if (!ensName.includes('.')) {
        console.error('Invalid ENS format');
        return null;
    }

    try {
        const resolver = await provider.getResolver(ensName);
        if (!resolver) {
            console.warn(`No resolver found for ${ensName}`);
            return null;
        }

        // Additional useful ENS text records
        const textRecords = [
            'avatar',
            'email',
            'com.twitter',
            'com.github',
            'com.discord',
            'org.telegram',
            'url',
            'description',
            'name',                // Human readable name
            'keywords',            // Associated keywords/tags
            'notice',             // Public notice
            'location',           // Geographic location
            'com.linkedin'        // LinkedIn profile
        ];

        // Fetch address and content hash in parallel with text records
        const [address, contentHash, ...textValues] = await Promise.all([
            resolver.getAddress().catch(() => null),
            resolver.getContentHash().catch(() => null),
            ...textRecords.map(record => 
                resolver.getText(record).catch(() => null)
            )
        ]);

        // Create result object with named properties
        const result = {
            ensName,
            address,
            contentHash,
            lastUpdated: new Date().toISOString()
        };

        // Map text records to result object
        textRecords.forEach((record, index) => {
            const key = record.includes('.') ? record.split('.').pop() : record;
            result[key] = textValues[index];
        });

        return result;
    } catch (error) {
        console.error('Error fetching ENS data:', error);
        return null;
    }
} 