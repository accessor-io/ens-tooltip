class EnsTooltip {
    static init(options = {}) {
        const defaults = {
            selector: '.ens-name',
            tooltipClass: 'ens-tooltip',
            offset: 8,
            delay: 200,
            fadeSpeed: 200
        };
        
        const settings = { ...defaults, ...options };
        
        try {
            document.querySelectorAll(settings.selector).forEach(element => {
                let tooltipTimeout;
                
                element.addEventListener('mouseenter', function(e) {
                    tooltipTimeout = setTimeout(() => {
                        const tooltip = EnsTooltip.createTooltip(e.target, settings);
                        document.body.appendChild(tooltip);
                        
                        // Fade in effect
                        requestAnimationFrame(() => {
                            tooltip.style.opacity = '1';
                        });
                    }, settings.delay);
                });
                
                element.addEventListener('mouseleave', function() {
                    clearTimeout(tooltipTimeout);
                    const tooltips = document.querySelectorAll(`.${settings.tooltipClass}`);
                    tooltips.forEach(tooltip => {
                        tooltip.style.opacity = '0';
                        setTimeout(() => tooltip.remove(), settings.fadeSpeed);
                    });
                });
            });
        } catch (error) {
            console.error('Error initializing ENS tooltip:', error);
        }
    }

    static createTooltip(target, settings) {
        const tooltip = document.createElement('div');
        tooltip.className = settings.tooltipClass;
        tooltip.textContent = `ENS: ${target.textContent}`;
        
        // Add initial styles for fade effect
        tooltip.style.opacity = '0';
        tooltip.style.transition = `opacity ${settings.fadeSpeed}ms ease-in-out`;
        
        // Position tooltip
        const rect = target.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calculate position
        let left = rect.left + scrollLeft;
        let top = rect.bottom + scrollTop + settings.offset;
        
        // Check if tooltip would go off-screen
        const tooltipRect = tooltip.getBoundingClientRect();
        if (left + tooltipRect.width > window.innerWidth) {
            left = rect.right - tooltipRect.width;
        }
        
        if (top + tooltipRect.height > window.innerHeight) {
            top = rect.top - tooltipRect.height - settings.offset;
        }
        
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.style.position = 'absolute';
        tooltip.style.zIndex = '1000';
        
        return tooltip;
    }
} 