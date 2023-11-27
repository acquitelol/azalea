import Theming from '@core/handlers/theming';
import utilities from '@core/utilities';
import { useStorageValue } from '@core/hooks';
import { createStyleSheet, commonStyles } from '@stylesheet';
import { common } from '@core/modules';

import { ColorInputProps } from '@azalea/themes';
import Row from '@core/components/row';

const { React } = common;
const { capitalize } = utilities;
const { merge, styles } = createStyleSheet({
    input: {
        borderRadius: '100em',
        height: 'var(--spx-unit-8)',
        marginInline: '1em'
    },

    color: {
        width: '1.5rem',
        height: '1.5rem',
        marginTop: '0.25rem',
        borderRadius: '0.5rem',
        border: '1px solid #00000020',
    }
});

function ColorInput({ label, color, colorKey, colorType, backgroundColor }: ColorInputProps) {
    const isKeyTint = React.useMemo(() => color.toLowerCase().includes('tint'), []);
    const defaultTheme = React.useMemo(() => Theming.themes.find(x => x.name === 'Pink').colors, []);

    const [value, setValue] = useStorageValue(color, 'colors');

    React.useEffect(() => {
        Theming.setTheme();
        Theming.applyLabel(label);
    }, [value]);

    return <Row
        label={capitalize(colorKey)}
        backgroundColor={backgroundColor}
        trailing={<div style={commonStyles.merge(x => [x.flex, x.align])}>
            <input 
                className={'_Search_juc87_90'}
                style={styles.input}
                placeholder={defaultTheme[colorType][colorKey]}
                value={value as string}
                onChange={(e) => setValue(e.target.value)}
            />

            <div style={commonStyles.merge(x => [x.flex, x.column])}>
                <div
                    style={merge(x => [
                        x.color,
                        {
                            backgroundColor: isKeyTint ? '#ff6d1f' : (value as string || `var(--${color})`),
                            filter: isKeyTint ? 'var(--tint)' : null
                        }
                    ])}
                />
            </div>
        </div>}
    />;
}

export default ColorInput;