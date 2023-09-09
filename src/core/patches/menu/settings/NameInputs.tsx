import components from '@core/components';
import utilities from '@core/utilities';
import { useStorageValue } from '@core/hooks';
import { common } from '@core/modules';

import NameInput from './NameInput';

const { React } = common;
const { name } = utilities;

export default () => {
    const [shouldUseCuteName, setShouldUseCuteName] = useStorageValue('shouldUseCuteName', 'preferences');

    return <>
        <div 
            style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 0
            }}
        >
            <h2 style={{ textAlign: 'center' }}>Anonymize name</h2>
            <components.SolidButton
                text={shouldUseCuteName ? 'Disable' : 'Enable'}
                onClick={() => setShouldUseCuteName(previous => !previous)}
            />
        </div>
        <div 
            style={{ 
                justifyContent: 'center',
                overflowY: 'scroll',
                flexWrap: 'wrap',
                display: 'flex'
            }}
        >
            <NameInput 
                type={'cuterFirstName'} 
                label={'First Name'} 
                placeholder={name.defaults.firstName}
            />
            <NameInput 
                type={'cuterLastName'} 
                label={'Last Name'}
                placeholder={name.defaults.lastName}
            />
        </div>
    </>
}