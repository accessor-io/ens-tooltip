/**
 * Creates and returns a tooltip element with specified configuration
 * @param {Object} config - Tooltip configuration object
 * @param {string} [config.theme.mode='dark'] - Theme mode for the tooltip
 * @param {string} [config.className] - Additional CSS classes
 * @returns {HTMLElement} The created tooltip element
 */
export function createTooltipElement(config) {
    const element = document.createElement('div');
    const baseClass = 'ens-tooltip';
    const themeClass = `theme-${config.theme?.mode || 'dark'}`;
    const customClass = config.className || '';
    
    element.className = [baseClass, themeClass, customClass].filter(Boolean).join(' ');
    element.style.cssText = 'display: none; position: absolute; z-index: 9999;';
    
    document.body.appendChild(element);
    return element;
}

/**
 * Updates tooltip position relative to target element with smart positioning
 * @param {HTMLElement} tooltipElement - The tooltip element to position
 * @param {HTMLElement} targetElement - The target element to position relative to
 * @param {Object} [options] - Positioning options
 * @param {number} [options.offset=10] - Offset from target element
 * @param {string} [options.preferredPosition='bottom'] - Preferred position ('top', 'bottom')
 */
export function updatePosition(tooltipElement, targetElement, options = {}) {
    if (!tooltipElement || !targetElement) {
        console.warn('Missing required elements for positioning');
        return;
    }

    const {
        offset = 10,
        preferredPosition = 'bottom'
    } = options;

    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Calculate initial position
    let top = preferredPosition === 'bottom'
        ? targetRect.bottom + window.scrollY + offset
        : targetRect.top + window.scrollY - tooltipRect.height - offset;
    
    let left = targetRect.left + window.scrollX + (targetRect.width / 2) - (tooltipRect.width / 2);

    // Horizontal bounds checking
    left = Math.max(offset, Math.min(left, viewportWidth - tooltipRect.width - offset));

    // Vertical bounds checking and auto-flip if needed
    const bottomOverflow = top + tooltipRect.height > viewportHeight + window.scrollY - offset;
    const topOverflow = top < window.scrollY + offset;

    if (preferredPosition === 'bottom' && bottomOverflow) {
        top = targetRect.top + window.scrollY - tooltipRect.height - offset;
    } else if (preferredPosition === 'top' && topOverflow) {
        top = targetRect.bottom + window.scrollY + offset;
    }

    tooltipElement.style.left = `${left}px`;
    tooltipElement.style.top = `${top}px`;
} 