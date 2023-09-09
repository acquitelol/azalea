import components from '@core/components';
import { useStorageValue } from '@core/hooks';
import { common } from '@core/modules';

const { React } = common;

export default () => {
    const [enabled, setEnabled] = useStorageValue<boolean>('autoBookwork', 'preferences');

    return <div 
        style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '0'
        }}
    >
        <h3 style={{ marginRight: '0.5em' }}>
            Autobookwork
        </h3>
        <components.SolidButton 
            text={enabled ? 'Disable' : 'Enable'}
            onClick={() => setEnabled(previous => !previous)}
        />
    </div>
}