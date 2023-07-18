import { storages } from "./state";

class Theming {
    static themes = [
        {
            name: "Pink",
            colors: {
                darkest: "#5e404b",
                dark: "#9c7280",
                medium: "#d1869f",
                light: "#deafc2",
                tint: {
                    color: "280deg",
                    saturation: 0.8
                },

                "text-light": "#ffedf2",
                "text-dark": "#362e30"
            }
        },
        {
            name: "Purple",
            colors: {
                darkest: "#58405e",
                dark: "#96729d",
                medium: "#c485d1",
                light: "#d3afde",
                tint: {
                    color: "230deg",
                    saturation: 0.8
                },

                "text-light": "#fdebff",
                "text-dark": "#362f37"
            }
        },
        {
            name: "Blue",
            colors: {
                darkest: "#404b5e",
                dark: "#72809d",
                medium: "#859ed1",
                light: "#afc2de",
                tint: {
                    color: "150deg",
                    saturation: 0.8
                },

                "text-light": "#ebf0ff",
                "text-dark": "#2f3137"
            }
        },
        {
            name: "Aqua",
            colors: {
                darkest: "#405e58",
                dark: "#729d96",
                medium: "#85d1c4",
                light: "#afded3",
                tint: {
                    color: "125deg",
                    saturation: 0.8
                },

                "text-light": "#ebfffd",
                "text-dark": "#2f3736"
            }
        },
        {
            name: "Green",
            colors: {
                darkest: "#415e40",
                dark: "#729d72",
                medium: "#85d185",
                light: "#b2deaf",
                tint: {
                    color: "80deg",
                    saturation: 0.8
                },

                "text-light": "#ebffec",
                "text-dark": "#2f372f"
            }
        },
        {
            name: "Creme",
            colors: {
                darkest: "#5e4940",
                dark: "#9d7f72",
                medium: "#d19e85",
                light: "#debdaf",
                tint: {
                    color: "330deg",
                    saturation: 0.8
                },

                "text-light": "#fff2eb",
                "text-dark": "#37322f"
            }
        },
        {
            name: "Dusk",
            colors: {
                darkest: "#030303",
                dark: "#3b3b3b",
                medium: "#5e5e5e",
                light: "#2e2e2e",
                tint: {
                    color: "0deg",
                    saturation: 0
                },

                "text-light": "#f5f5f5",
                "text-dark": "#1a1a1a"
            }
        },
        {
            name: "Noir",
            colors: {
                darkest: "#000000",
                dark: "#212121",
                medium: "#454545",
                light: "#0d0d0d",
                tint: {
                    color: "0deg",
                    saturation: 0
                },

                "text-light": "#f5f5f5",
                "text-dark": "#1a1a1a"
            }
        },
    ];

    static get index() {
        return storages.preferences.get("themeIndex") ?? 0
    };

    static get theme() {
        return this.themes[this.index];
    }

    static applyLabel(label: Element | null) {
        if (!label) return;

        label.textContent = `${label?.textContent?.split("|")[0]} | ${this.theme.name}`
    }
    
    static setTheme() {
        Object.entries(this.theme.colors)
            .map(([variable, color]) => {
                if (variable === "tint") {
                    const tintObject = color as Record<string, any>;
                    return [variable, `sepia(1) hue-rotate(${tintObject.color}) saturate(${tintObject.saturation})`]
                }

                return [variable, color];
            })
            .forEach(([variable, color]) => {
                document.documentElement.style.setProperty(`--${variable}`, color as string);
            })
    }
};

export default Theming;