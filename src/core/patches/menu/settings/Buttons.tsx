import components from '@core/components';
import utilities from '@core/utilities';
import { common } from '@core/modules';

const { React } = common;
const { navigate } = utilities;

const buttons = [
    {
        name: 'About',
        callback() {
            navigate('/azalea/about')
        }
    },
    {
        name: 'Bookwork',
        callback() {
            navigate('/azalea/bookwork')
        }
    },
    {
        name: 'Done',
        callback() {
            navigate(-1, null)
        }
    }
]

export default () => {
    return <div>
        {buttons.map(button => {
            return <components.SolidButton 
                text={button.name}
                style={{ marginTop: 20 }}
                onClick={button.callback}
            />
        })}
    </div>
}