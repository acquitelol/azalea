import Theming from '@core/handlers/theming'
import Components from '@core/components'
import utilities from '@core/utilities'
import { useStorageValue } from '@core/hooks'
import { common } from '@core/modules'

import SelectTheme from './SelectTheme'
import ColorInputs from './ColorInputs'

import { ThemesProps } from '@azalea/themes'

const { React } = common;
const { navigate } = utilities;

export default ({ label }: ThemesProps) => {
    const [selected, setSelected] = useStorageValue<number>('themeIndex', 'preferences');

    return <div>
        <div
            style={{
                display: 'flex',
                padding: '1em',
                paddingTop: 0,
                paddingBottom: '1.5em',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <SelectTheme 
                label={label}
                selected={selected} 
                setSelected={setSelected} 
            />
            <Components.Button 
                text={'Cycle Theme'}
                className={'cycle-theme-btn'}
                onClick={() => setSelected((previous) => Theming.themes[previous + 1] ? previous + 1 : 0)}
            />
        </div>

        <ColorInputs
            selected={selected}
            setSelected={setSelected}
            label={label}
        />

        <Components.Button 
            text={'Done'}
            className={'_ButtonBase_10evl_1 _FocusTarget_1nxry_1 _ButtonMd_10evl_27 _ButtonBlue_10evl_51 _ButtonContained_10evl_81'}
            onClick={() => navigate('/')}
        />
    </div>
}