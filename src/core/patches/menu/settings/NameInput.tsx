import { useStorageValue } from '@core/hooks'
import { common } from '@core/modules'

import { NameInputProps } from '@azalea/settings'

const { React } = common;

export default ({ type, label, placeholder }: NameInputProps) => {
    const [value, setValue] = useStorageValue(type, 'preferences');
    
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
            {label}
        </p>
        <input 
            type={'text'}
            className={'revision-search'}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </div>
}