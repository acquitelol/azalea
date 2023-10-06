import utilities from '@core/utilities';
import { commonStyles } from '@stylesheet';
import { common } from '@core/modules';

import NameInput from './NameInput';

const { React } = common;
const { name } = utilities;

export default () => {
    return <div style={commonStyles.merge(x => [x.flex, x.justify, x.wrap])}>
        <NameInput 
            type={'cuterFirstName'} 
            label={'First'} 
            placeholder={name.defaults.firstName}
        />
        <NameInput 
            type={'cuterLastName'} 
            label={'Last'}
            placeholder={name.defaults.lastName}
        />
    </div>
}