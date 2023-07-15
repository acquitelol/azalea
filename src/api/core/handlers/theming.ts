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
        }
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