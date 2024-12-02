const { ethers } = require('ethers');

// Simple test function
async function testENSConnection() {
    try {
        // Initialize provider
        const provider = new ethers.providers.InfuraProvider(
            'mainnet',
            '9e88fbe7e3cf4adba63f545158e31cfc'
        );

        // Test with a known ENS name (e.g., vitalik.eth)
        const ensName = 'vitalik.eth';
        console.log('Testing connection with:', ensName);

        // Try to resolve the name
        const address = await provider.resolveName(ensName);
        console.log('Address:', address);

        // If we got here, the connection is working
        console.log('Connection successful!');
        return address;
    } catch (error) {
        console.error('Connection test failed:', error);
        throw error;
    }
}

// Run the test
testENSConnection()
    .then(result => console.log('Test completed:', result))
    .catch(error => console.error('Test failed:', error)); 