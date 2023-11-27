import { storages } from './state';
import themes from '@extension/themes.json';

const { preferences, colors } = storages;

export const spec = {
    raw: [
        'darkest',
        'dark',
        'medium',
        'light',
        'lightest',
        'shine'
    ],

    tint: [
        'hue',
        'intensity'
    ],

    shadow: [
        'small',
        'medium',
        'large'
    ]
} as const;

type Theme = {
    name: string;
    colors: {
        [K in keyof typeof spec]: {
            [T in typeof spec[K][number]]: string
        }
    };
}

class Theming {
    static generateTheme(callback: ({ key, item }: { key: string, item: string }) => string) {
        return Object.keys(spec).reduce((acc, key) => ({
            ...acc,
            [key]: spec[key].reduce((acc, item) => {
                return {
                    ...acc,
                    [item]: callback({ key, item })
                };
            }, {})
        }), {}) as Theme['colors'];
    }

    static themes = [
        {
            name: 'None',
            get colors() {
                return Theming.generateTheme(() => null);
            }
        },
        ...themes,
        {
            name: 'Custom',
            get colors() {
                return Theming.generateTheme(({ key, item }) => colors.get(`${key}-${item}`));
            }
        }
    ] satisfies Theme[];

    static get index() {
        return preferences.get('themeIndex') ?? 0;
    };

    static get theme() {
        return this.themes[this.index];
    }

    static applyLabel(label: Element | null) {
        if (!label) return;

        label.textContent = `${label?.textContent?.split('|')[0]} | ${this.theme.name}`;
    }

    static setTheme() {
        const stylesheet = document.querySelector('#azalea-theme-styles');

        if (this.theme.name === 'None') {
            // Disable the stylesheet and remove css variables from the documentElement
            stylesheet.setAttribute('media', 'max-width: 1px');

            Object.entries(this.theme.colors).forEach(([colorType, colors]: [string, any]) => {
                Object.entries(colors).forEach(([key]) => {
                    document.documentElement.style.removeProperty(`--${colorType}-${key}`);
                });
            });

            return;
        }

        if (stylesheet.hasAttribute('media')) stylesheet.removeAttribute('media');
        if (!this.theme.colors) return;

        Object.entries(this.theme.colors).forEach(([colorType, colors]: [string, any]) => {
            if (colorType === 'tint') {
                const hue = colors.hue || '280deg';
                const intensity = colors.intensity !== 0 && !colors.intensity ? '0.8' : colors.intensity;

                const color = `sepia(1) hue-rotate(${hue}) saturate(${intensity})`;
                return document.documentElement.style.setProperty(`--${colorType}`, color);
            }

            Object.entries(colors).forEach(([key, color]) => {
                document.documentElement.style.setProperty(`--${colorType}-${key}`, color as string);
            });
        });
    }
};

export default Theming;