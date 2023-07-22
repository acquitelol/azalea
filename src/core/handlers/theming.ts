import { storages } from "./state"

const { preferences, colors } = storages;

export const spec = {
    raw: [
        "darkest",
        "dark",
        "medium",
        "light"
    ],

    tint: [
        "hue",
        "intensity"
    ],

    text: [
        "light",
        "dark"
    ]
};

class Theming {
    static themes = [
        {
            name: "Pink",
            colors: {
                raw: {
                    darkest: "#5e404b",
                    dark: "#9c7280",
                    medium: "#d1869f",
                    light: "#deafc2",
                },

                tint: {
                    hue: "280deg",
                    intensity: 0.8
                },

                text: {
                    light: "#ffedf2",
                    dark: "#362e30"
                }
            }
        },
        {
            name: "Violet",
            colors: {
                raw: {
                    darkest: "#4e405e",
                    dark: "#87729d",
                    medium: "#ab85d1",
                    light: "#c4afde",
                },

                tint: {
                    hue: "210deg",
                    intensity: 0.8
                },

                text: {
                    light: "#f6ebff",
                    dark: "#332f37"
                }
            }
        },
        {
            name: "Blue",
            colors: {
                raw: {
                    darkest: "#404b5e",
                    dark: "#72809d",
                    medium: "#859ed1",
                    light: "#afc2de",
                },

                tint: {
                    hue: "150deg",
                    intensity: 0.8
                },

                text: {
                    light: "#ebf0ff",
                    dark: "#2f3137"
                }
            }
        },
        {
            name: "Aqua",
            colors: {
                raw: {
                    darkest: "#405e58",
                    dark: "#729d96",
                    medium: "#85d1c4",
                    light: "#afded3",
                },

                tint: {
                    hue: "125deg",
                    intensity: 0.8
                },

                text: {
                    light: "#ebfffd",
                    dark: "#2f3736"
                }
            }
        },
        {
            name: "Green",
            colors: {
                raw: {
                    darkest: "#415e40",
                    dark: "#729d72",
                    medium: "#85d185",
                    light: "#b2deaf",
                },

                tint: {
                    hue: "80deg",
                    intensity: 0.8
                },

                text: {
                    light: "#ebffec",
                    dark: "#2f372f"
                }
            }
        },
        {
            name: "Creme",
            colors: {
                raw: {
                    darkest: "#5e4940",
                    dark: "#9d7f72",
                    medium: "#d19e85",
                    light: "#debdaf",
                },

                tint: {
                    hue: "330deg",
                    intensity: 0.8
                },

                text: {
                    light: "#fff2eb",
                    dark: "#37322f"
                }
            }
        },
        {
            name: "Dusk",
            colors: {
                raw: {
                    darkest: "#030303",
                    dark: "#3b3b3b",
                    medium: "#5e5e5e",
                    light: "#2e2e2e",
                },

                tint: {
                    hue: "0deg",
                    intensity: 0
                },

                text: {
                    light: "#f5f5f5",
                    dark: "#1a1a1a"
                }
            }
        },
        {
            name: "Custom",
            get colors() {
                return Object.keys(spec).reduce((acc, key) => ({
                    ...acc,
                    [key]: spec[key].reduce((acc, item) => {
                        return { 
                            ...acc, 
                            [item]: colors.get(`${key}-${item}`)
                        }
                    }, {})
                }), {})
            }
        }
    ] as const;

    static get index() {
        return preferences.get("themeIndex") ?? 0
    };

    static get theme() {
        return this.themes[this.index];
    }

    static applyLabel(label: Element | null) {
        if (!label) return;

        label.textContent = `${label?.textContent?.split("|")[0]} | ${this.theme.name}`
    }
    
    static setTheme() {
        Object.entries(this.theme.colors).forEach(([colorType, colors]) => {
            if (colorType === "tint") {
                const hue = colors.hue || "280deg";
                const intensity = colors.intensity !== 0 && !colors.intensity ? "0.8" : colors.intensity;

                const color = `sepia(1) hue-rotate(${hue}) saturate(${intensity})`;
                return document.documentElement.style.setProperty(`--${colorType}`, color as string);
            }

            Object.entries(colors).forEach(([key, color]) => {
                document.documentElement.style.setProperty(`--${colorType}-${key}`, color as string);
            })
        })
    }
};

export default Theming;