import components from '@core/components';
import { commonStyles } from '@core/stylesheet';
import { common } from '@core/modules';

const { React } = common;

export default ({ enabled, setEnabled }) => {
    return <div style={commonStyles.merge(x => [x.flex, x.align, { marginBottom: '0' }])}>
        <h3 style={{ marginRight: '0.5em' }}>
            Autobookwork (<strong>{enabled ? 'Enabled' : 'Disabled'}</strong>)
        </h3>
        <components.SolidButton 
            text={enabled ? 'Disable' : 'Enable'}
            onClick={() => setEnabled(previous => !previous)}
        />
    </div>
}