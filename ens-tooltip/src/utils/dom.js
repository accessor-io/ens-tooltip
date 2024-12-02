export function createTooltipElement(config) {
    const element = document.createElement('div');
    element.className = `ens-tooltip theme-${config.theme?.mode || 'dark'}`;
    element.style.display = 'none';
    document.body.appendChild(element);
    return element;
}

export function updatePosition(tooltipElement, targetElement) {
    if (!tooltipElement || !targetElement) return;

    const rect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();

    let top = rect.bottom + window.scrollY + 10;
    let left = rect.left + window.scrollX + (rect.width / 2) - (tooltipRect.width / 2);

    // Viewport adjustments
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
    }

    if (top + tooltipRect.height > window.innerHeight + window.scrollY - 10) {
        top = rect.top + window.scrollY - tooltipRect.height - 10;
    }

    tooltipElement.style.left = `${left}px`;
    tooltipElement.style.top = `${top}px`;
} 