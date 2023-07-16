import { storages } from "./default";

class Theming {
    static themes = [
        {
            name: "Pink",
            colors: {
                darkest: "#5e404b",
                dark: "#9c7280",
                medium: "#d1869f",
                light: "#deafc2",
                tint: "280deg",

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
                tint: "230deg",

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
                tint: "150deg",

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
                tint: "125deg",

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
                tint: "80deg",

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
                tint: "330deg",

                "text-light": "#fff2eb",
                "text-dark": "#37322f"
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
        label && (label.textContent = `${label?.textContent?.split("|")[0]} | ${this.theme.name}`)
    }
    
    static setTheme() {
        Object.entries(this.theme.colors).forEach(([variable, color]) => {
            document.documentElement.style.setProperty(`--${variable}`, variable === "tint" 
                ? `sepia(1) hue-rotate(${color}) saturate(0.8)` 
                : color
            );
        })
    }
};

export default Theming;