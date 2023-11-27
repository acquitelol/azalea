import utilities from '@core/utilities';
import { commonStyles } from '@stylesheet';
import { common } from '@core/modules';
import { applyLogo } from '@entry/logo';

import LogoInput from './LogoInput';

const { React } = common;
const { getImage } = utilities;

function Logo() {
    React.useEffect(() => {
        applyLogo(null, {});

        return () => applyLogo(null, {});
    }, []);
    
    return <div style={commonStyles.merge(x => [x.flex, x.justify, x.wrap])}>
        <LogoInput 
            type={'customLogoUrl'} 
            label={'URL'}
            placeholder={getImage('logo.png')}
            callback={(value) => applyLogo(null, { url: value })}
        />
        <LogoInput 
            type={'customLogoSize'} 
            label={'Size'}
            placeholder={'50px'}
            callback={(value) => applyLogo(null, { size: value })}
        />
    </div>;
}

export default Logo;