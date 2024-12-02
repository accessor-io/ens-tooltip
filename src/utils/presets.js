const ENSTooltipPresets = {
    // Base tooltip animations
    animations: {
        '@keyframes tooltipFadeIn': {
            '0%': {
                opacity: 0,
                transform: 'translateY(8px) scale(0.98)'
            },
            '100%': {
                opacity: 1,
                transform: 'translateY(0) scale(1)'
            }
        },
        '@keyframes tooltipPulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.02)' },
            '100%': { transform: 'scale(1)' }
        }
    },

    // Enhanced tooltip base styles
    baseTooltip: {
        position: 'absolute',
        zIndex: 1000,
        animation: 'tooltipFadeIn 0.2s ease-out',
        backdropFilter: 'blur(8px)',
        maxWidth: '380px',
        minWidth: '280px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
        lineHeight: '1.5',
        visibility: 'visible',
        pointerEvents: 'auto',
        transformOrigin: 'center top'
    },

    // Tooltip themes
    themes: {
        // Modern Dark Theme
        dark: {
            background: 'linear-gradient(145deg, rgba(32, 33, 37, 0.95) 0%, rgba(28, 29, 34, 0.95) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: `
                0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06),
                0 0 0 1px rgba(255, 255, 255, 0.05)
            `,
            color: '#ffffff',
            
            // Dark theme specific elements
            elements: {
                header: {
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(0, 0, 0, 0.2)'
                },
                divider: {
                    background: 'rgba(255, 255, 255, 0.08)'
                },
                link: {
                    color: '#6ea8fe',
                    hover: {
                        color: '#9ec5fe'
                    }
                }
            }
        },

        // Clean Light Theme
        light: {
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 251, 252, 0.95) 100%)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: `
                0 4px 6px -1px rgba(0, 0, 0, 0.07),
                0 2px 4px -1px rgba(0, 0, 0, 0.05),
                0 0 0 1px rgba(0, 0, 0, 0.05)
            `,
            color: '#1a1a1a',
            
            // Light theme specific elements
            elements: {
                header: {
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                    background: 'rgba(0, 0, 0, 0.02)'
                },
                divider: {
                    background: 'rgba(0, 0, 0, 0.06)'
                },
                link: {
                    color: '#0066cc',
                    hover: {
                        color: '#0052a3'
                    }
                }
            }
        }
    },

    // Position variations
    positions: {
        top: {
            transform: 'translateY(-8px)',
            marginBottom: '8px'
        },
        bottom: {
            transform: 'translateY(8px)',
            marginTop: '8px'
        },
        left: {
            transform: 'translateX(-8px)',
            marginRight: '8px'
        },
        right: {
            transform: 'translateX(8px)',
            marginLeft: '8px'
        }
    },

    // Component-specific styles
    components: {
        container: {
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            
            hover: {
                transform: 'translateY(-1px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
            }
        },

        header: {
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },

        avatar: {
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease',
            
            hover: {
                transform: 'scale(1.05)'
            }
        },

        content: {
            padding: '16px'
        },

        socialLinks: {
            display: 'flex',
            gap: '12px',
            padding: '12px 16px',
            borderTop: '1px solid rgba(0, 0, 0, 0.06)',
            
            icon: {
                transition: 'transform 0.2s ease, opacity 0.2s ease',
                opacity: 0.8,
                
                hover: {
                    transform: 'translateY(-2px)',
                    opacity: 1
                }
            }
        },

        button: {
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            fontSize: '14px',
            fontWeight: 500,
            
            primary: {
                background: 'linear-gradient(145deg, #3898ff 0%, #2f7ee8 100%)',
                color: '#ffffff',
                boxShadow: '0 2px 6px rgba(56, 152, 255, 0.3)',
                
                hover: {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(56, 152, 255, 0.4)'
                }
            }
        },

        address: {
            fontFamily: 'monospace',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '13px',
            background: 'rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            
            hover: {
                background: 'rgba(0, 0, 0, 0.06)'
            }
        }
    },

    // Interactive states
    states: {
        loading: {
            opacity: 0.7,
            pointerEvents: 'none'
        },
        disabled: {
            opacity: 0.5,
            pointerEvents: 'none',
            cursor: 'not-allowed'
        },
        active: {
            transform: 'scale(0.98)'
        }
    }
};

// Add responsive breakpoints
const breakpoints = {
    mobile: {
        maxWidth: '320px',
        padding: '12px',
        fontSize: '13px'
    },
    tablet: {
        maxWidth: '380px',
        padding: '16px',
        fontSize: '14px'
    }
};

// Initialize the tooltip with your Infura project ID
const tooltip = new ENSTooltip({
    infuraProjectId: 'YOUR_INFURA_PROJECT_ID',
    preset: 'completeProfile',
    network: 'mainnet',
    cacheTimeout: 3600000 // 1 hour
});

// Example usage
async function showTooltip(ensName) {
    try {
        const ensData = await tooltip.getENSData(ensName);
        // Your tooltip rendering logic here
        console.log('ENS Data:', ensData);
    } catch (error) {
        console.error('Error fetching ENS data:', error);
    }
}

// Export configurations
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ENSTooltipPresets,
        breakpoints
    };
} else {
    window.ENSTooltipPresets = ENSTooltipPresets;
    window.tooltipBreakpoints = breakpoints;
} 