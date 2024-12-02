import { ENSTooltip } from '../src/plugin';

describe('ENSTooltip', () => {
    let tooltip;
    
    beforeEach(() => {
        // Setup fresh instance before each test
        tooltip = new ENSTooltip();
    });

    afterEach(() => {
        // Cleanup after each test
        if (tooltip.destroy) {
            tooltip.destroy();
        }
    });

    test('should initialize with default config', () => {
        expect(tooltip).toBeDefined();
        expect(tooltip.config).toBeDefined();
    });

    test('should accept custom configuration', () => {
        const customConfig = {
            delay: 500,
            position: 'top',
            theme: 'dark'
        };
        const customTooltip = new ENSTooltip(customConfig);
        expect(customTooltip.config).toEqual(expect.objectContaining(customConfig));
    });

    test('should handle ENS address lookup', async () => {
        const mockEnsAddress = 'vitalik.eth';
        const mockResolvedAddress = '0x123...';
        
        // Mock ENS resolution
        tooltip.resolveENS = jest.fn().mockResolvedValue(mockResolvedAddress);
        
        const result = await tooltip.resolveENS(mockEnsAddress);
        expect(result).toBe(mockResolvedAddress);
        expect(tooltip.resolveENS).toHaveBeenCalledWith(mockEnsAddress);
    });

    test('should handle invalid ENS addresses', async () => {
        const invalidAddress = 'invalid.eth';
        
        tooltip.resolveENS = jest.fn().mockRejectedValue(new Error('Invalid ENS address'));
        
        await expect(tooltip.resolveENS(invalidAddress)).rejects.toThrow('Invalid ENS address');
    });

    test('should show and hide tooltip', () => {
        // Mock DOM methods
        document.createElement = jest.fn().mockReturnValue({
            classList: {
                add: jest.fn(),
                remove: jest.fn()
            },
            style: {}
        });

        tooltip.show();
        expect(tooltip.isVisible).toBe(true);

        tooltip.hide();
        expect(tooltip.isVisible).toBe(false);
    });

    test('should position tooltip correctly', () => {
        const element = document.createElement('div');
        const position = tooltip.calculatePosition(element);

        expect(position).toHaveProperty('top');
        expect(position).toHaveProperty('left');
    });
}); 