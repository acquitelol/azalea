import Theming from '@core/handlers/theming';
import { useStorageValue } from '@core/hooks';
import { common } from '@core/modules';
import { commonStyles } from '@stylesheet';

import Row from '@core/components/row';
import SelectTheme from './SelectTheme';
import components from '@core/components';
import ColorInputs from './ColorInputs';

const { React } = common;

export default () => {
    const [label] = React.useState(document.querySelector('[class*="_XPCount_"]'));
    const [selected, setSelected] = useStorageValue<number>('themeIndex', 'preferences');

    return <Row 
        label={<div style={commonStyles.merge(x => [x.flex, x.align])}>
            <h3 style={{ fontWeight: 700 }}>Selected theme:</h3>
            <SelectTheme 
                label={label} 
                selected={selected}
                setSelected={setSelected}
            />
        </div>}
        trailing={<components.SolidButton 
            text={'Cycle Theme'}
            onClick={() => setSelected((previous) => Theming.themes[previous + 1] ? previous + 1 : 0)}
        />}
        extra={<ColorInputs
            selected={selected}
            setSelected={setSelected}
            label={label}
        />}
    />
}