import Theming from '@core/handlers/theming';
import components from '@core/components';
import utilities from '@core/utilities';
import { useStorageValue } from '@core/hooks';
import { common } from '@core/modules';

import SelectTheme from './SelectTheme';
import ColorInputs from './ColorInputs';

import { ThemesProps } from '@azalea/themes';

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
            <components.SolidButton 
                text={'Cycle Theme'}
                onClick={() => setSelected((previous) => Theming.themes[previous + 1] ? previous + 1 : 0)}
            />
        </div>

        <ColorInputs
            selected={selected}
            setSelected={setSelected}
            label={label}
        />

        <components.SolidButton 
            text={'Done'}
            onClick={() => navigate(-1, { enabled: false })}
        />
    </div>
}