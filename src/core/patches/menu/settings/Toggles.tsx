import { common } from '@core/modules';

import components from '@core/components';
import { SettingRow } from '@core/components/row';
import NameInputs from './name';
import LogoInput from './logo';

const { React } = common;

const options = [
    {
        label: 'Logger',
        sublabel: 'Toggles Azalea\'s custom Logger in the Developer console.',
        option: 'logger'
    },
    {
        label: 'Anonymize Name',
        sublabel: 'Allows you to set your own custom first and last name.',
        option: 'shouldUseCuteName',
        extra() {
            return <NameInputs />;
        }
    },
    {
        label: 'Sparx Logo',
        sublabel: 'Allows you to set your own custom image URL for the Sparx Logo..',
        option: 'shouldUseCustomLogo',
        extra() {
            return <LogoInput />;
        }
    }
];

function Toggles() {
    return options.map(({ extra: Extra, ...props }, i, array) => (
        <>
            <SettingRow 
                {...props}
                extra={Extra && <Extra />}
            />
            {i !== array.length - 1 && <components.Dividers.Large />}
        </>
    ));
}

export default Toggles;