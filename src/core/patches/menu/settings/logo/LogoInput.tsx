import { useStorageValue } from '@core/hooks';
import { createStyleSheet, commonStyles } from '@stylesheet';
import { common } from '@core/modules';

import { LogoInputProps } from '@azalea/settings';

const { React } = common;
const { styles } = createStyleSheet({
    container: {
        width: '100%',
        marginBlock: '0.5em'
    },

    label: {
        marginRight: '1rem',
        marginBlock: '0.4rem',
        flexGrow: 1,
        width: 'min-content'
    },

    input: {
        borderRadius: '100em',
        height: 'var(--spx-unit-10)',
    }
});

function LogoInput({ type, label, placeholder, callback }: LogoInputProps) {
    const [value, setValue] = useStorageValue(type, 'preferences');
    
    return <div style={commonStyles.merge(x => [x.flex, x.justify, x.align, styles.container])}>
        <p style={styles.label}>
            {label}
        </p>
        <input 
            type={'text'}
            className={'_Search_juc87_90'}
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChange={(e) => (setValue(e.target.value), callback(e.target.value))}
        />
    </div>;
}

export default LogoInput;