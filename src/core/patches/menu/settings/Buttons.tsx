import Components from '@core/components'
import utilities from '@core/utilities'
import { useStorageValue } from '@core/hooks'
import { common } from '@core/modules'

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
            navigate(-1, { enabled: false })
        }
    }
]

export default () => {
    return <div>
        {buttons.map(button => {
            return <Components.Button 
                text={button.name}
                className=''
                onClick={button.callback}
            />
        })}
    </div>
}