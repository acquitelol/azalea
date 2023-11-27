import components from '@core/components';
import { commonStyles } from '@core/stylesheet';
import { common } from '@core/modules';

import { ToggleProps } from '@azalea/bookwork';

const { React } = common;

function Toggle({ enabled, setEnabled }: ToggleProps) {
    return <div style={commonStyles.merge(x => [x.flex, x.align, { marginBottom: '0' }])}>
        <h3 style={{ marginRight: '0.5em' }}>
            Autobookwork (<strong>{enabled ? 'Enabled' : 'Disabled'}</strong>)
        </h3>
        <components.SolidButton 
            text={enabled ? 'Disable' : 'Enable'}
            onClick={() => setEnabled(previous => !previous)}
        />
    </div>;
}

export default Toggle;