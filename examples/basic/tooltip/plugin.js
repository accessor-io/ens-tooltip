class EnsTooltip {
    static init(options = {}) {
        const defaults = {
            selector: '.ens-name',
            tooltipClass: 'ens-tooltip'
        };
        
        const settings = { ...defaults, ...options };
        
        document.querySelectorAll(settings.selector).forEach(element => {
            element.addEventListener('mouseenter', function(e) {
                const tooltip = this.createTooltip(e.target);
                document.body.appendChild(tooltip);
            });
            
            element.addEventListener('mouseleave', function() {
                const tooltips = document.querySelectorAll(`.${settings.tooltipClass}`);
                tooltips.forEach(tooltip => tooltip.remove());
            });
        });
    }

    static createTooltip(target) {
        const tooltip = document.createElement('div');
        tooltip.className = 'ens-tooltip';
        tooltip.textContent = `ENS: ${target.textContent}`;
        
        const rect = target.getBoundingClientRect();
        tooltip.style.left = `${rect.left}px`;
        tooltip.style.top = `${rect.bottom + 5}px`;
        
        return tooltip;
    }
} 