import { ENSTooltip } from './plugin';
import { defaultConfig } from './config';
import { presets } from './utils/presets';

// Export main components
export {
    ENSTooltip as default,
    defaultConfig,
    presets
};

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
    window.ENSTooltip = ENSTooltip;
    window.ENSTooltipPresets = presets;
}
