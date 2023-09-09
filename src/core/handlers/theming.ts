import { storages } from './state'

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
    ]
};

class Theming {
    static themes = [
        {
            name: 'Pink',
            colors: {
                raw: {
                    darkest: '#5e404b',
                    dark: '#9c7280',
                    medium: '#d1869f',
                    light: '#deafc2',
                    lightest: '#ffe8f1',
                    shine: '#fff0f6'
                },

                tint: {
                    hue: '280deg',
                    intensity: 0.8
                }
            }
        },
        {
            name: 'Violet',
            colors: {
                raw: {
                    darkest: '#4e405e',
                    dark: '#87729d',
                    medium: '#ab85d1',
                    light: '#c4afde',
                    lightest: '#ead9ff',
                    shine: '#f5edff'
                },

                tint: {
                    hue: '210deg',
                    intensity: 0.8
                }
            }
        },
        {
            name: 'Blue',
            colors: {
                raw: {
                    darkest: '#404b5e',
                    dark: '#72809d',
                    medium: '#859ed1',
                    light: '#afc2de',
                    lightest: '#dbeaff',
                    shine: '#ebf3ff'
                },

                tint: {
                    hue: '150deg',
                    intensity: 0.8
                }
            }
        },
        {
            name: 'Aqua',
            colors: {
                raw: {
                    darkest: '#405e58',
                    dark: '#729d96',
                    medium: '#85d1c4',
                    light: '#afded3',
                    lightest: '#d9fff6',
                    shine: '#edfffb'
                },

                tint: {
                    hue: '125deg',
                    intensity: 0.8
                }
            }
        },
        {
            name: 'Green',
            colors: {
                raw: {
                    darkest: '#415e40',
                    dark: '#729d72',
                    medium: '#85d185',
                    light: '#b2deaf',
                    lightest: '#d9ffd6',
                    shine: '#ecffeb'
                },

                tint: {
                    hue: '80deg',
                    intensity: 0.8
                }
            }
        },
        {
            name: 'Creme',
            colors: {
                raw: {
                    darkest: '#5e4940',
                    dark: '#9d7f72',
                    medium: '#d19e85',
                    light: '#debdaf',
                    lightest: '#ffe8de',
                    shine: '#fff3ed'
                },

                tint: {
                    hue: '330deg',
                    intensity: 0.8
                }
            }
        },
        {
            name: 'Custom',
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
        return preferences.get('themeIndex') ?? 0
    };

    static get theme() {
        return this.themes[this.index];
    }

    static applyLabel(label: Element | null) {
        if (!label) return;

        label.textContent = `${label?.textContent?.split('|')[0]} | ${this.theme.name}`
    }

    static setTheme() {
        Object.entries(this.theme.colors).forEach(([colorType, colors]) => {
            if (colorType === 'tint') {
                const hue = colors.hue || '280deg';
                const intensity = colors.intensity !== 0 && !colors.intensity ? '0.8' : colors.intensity;

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