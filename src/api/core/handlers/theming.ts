import { storages } from "./default";

class Theming {
    static themes = [
        {
            name: "Pink",
            colors: {
                darkest: "#613248",
                dark: "#a6537a",
                medium: "#d979a6",
                light: "#ff94c1"
            }
        },
        {
            name: "Purple",
            colors: {
                darkest: "#61325f",
                dark: "#9753a6",
                medium: "#c179d9",
                light: "#f494ff"
            }
        },
        {
            name: "Blue",
            colors: {
                darkest: "#324261",
                dark: "#5370a6",
                medium: "#79afd9",
                light: "#94b1ff"
            }
        },
        {
            name: "Aqua",
            colors: {
                darkest: "#326160",
                dark: "#53a5a6",
                medium: "#79d7d9",
                light: "#94fff8"
            }
        },
        {
            name: "Green",
            colors: {
                darkest: "#326135",
                dark: "#53a65e",
                medium: "#79d993",
                light: "#94ff9f"
            }
        },
    ];

    static get current() {
        return storages.preferences.get("themeIndex") ?? 0
    };
    
    static setTheme(label: any, index = this.current) {
        Object.keys(this.themes[0].colors).forEach(variable => {
            document.documentElement.style.setProperty(`--${variable}`, this.themes[index].colors[variable]);
        })

        label && (label.textContent = `${label.textContent.split("|")[0]} | ${this.themes[this.current].name}`)
    }
};

export default Theming;