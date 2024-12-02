export async function fetchENSData(provider, ensName) {
    try {
        const resolver = await provider.getResolver(ensName);
        if (!resolver) return null;

        const [
            address,
            avatar,
            email,
            twitter,
            github,
            discord,
            telegram,
            url,
            description
        ] = await Promise.all([
            resolver.getAddress().catch(() => null),
            resolver.getText('avatar').catch(() => null),
            resolver.getText('email').catch(() => null),
            resolver.getText('com.twitter').catch(() => null),
            resolver.getText('com.github').catch(() => null),
            resolver.getText('com.discord').catch(() => null),
            resolver.getText('org.telegram').catch(() => null),
            resolver.getText('url').catch(() => null),
            resolver.getText('description').catch(() => null)
        ]);

        return {
            address,
            avatar,
            email,
            twitter,
            github,
            discord,
            telegram,
            url,
            description
        };
    } catch (error) {
        console.error('Error fetching ENS data:', error);
        return null;
    }
} 