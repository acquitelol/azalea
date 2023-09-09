import Theming from '@core/handlers/theming';
import utilities from '@core/utilities';
import { useStorageValue } from '@core/hooks';
import { common } from '@core/modules';

import { ColorInputProps } from '@azalea/themes';

const { React } = common;
const { capitalize } = utilities;

export default ({ label, color, colorKey, colorType }: ColorInputProps) => {
    const isKeyTint = React.useMemo(() => color.toLowerCase().includes('tint'), []);
    const defaultTheme = React.useMemo(() => Theming.themes[0].colors, []);

    const [value, setValue] = useStorageValue(color, 'colors');

    React.useEffect(() => {
        Theming.setTheme();
        Theming.applyLabel(label);
    }, [value]);
    
    return <div 
        style={{ 
            display: 'flex', 
            width: '100%', 
            justifyContent: 'center',
        }}
    >
        <p 
            style={{ 
                marginRight: '1rem',
                marginBlock: '0.4rem',
                flexGrow: 1,
                maxWidth: '30%'
            }}
        >
            {capitalize(colorKey)}
        </p>
        <input 
            type={'text'}
            className={'revision-search'}
            placeholder={defaultTheme[colorType][colorKey]}
            value={value as string}
            onChange={(e) => setValue(e.target.value)}
        />
        <div
            style={{ 
                width: '1.5rem',
                height: '1.5rem',
                marginTop: '0.25rem',
                borderRadius: '0.5rem',
                backgroundColor: isKeyTint ? '#ff6d1f' : (value as string || `var(--${color})`),
                filter: isKeyTint ? 'var(--tint)' : null
            }}
        />
    </div>
}