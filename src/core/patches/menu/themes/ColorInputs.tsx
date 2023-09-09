import Theming, { spec } from '@core/handlers/theming';
import components from '@core/components';
import utilities from '@core/utilities';
import { common } from '@core/modules';
import { storages } from '@core/handlers/state';

import ColorInput from './ColorInput';

import { ColorInputsProps } from '@azalea/themes';

const { React } = common;
const { colors } = storages;
const { capitalize } = utilities

export default ({ selected, setSelected, label }: ColorInputsProps) => {
    const shouldDisplayEditor = React.useMemo(() => Theming.themes[selected].name === 'Custom', [selected])

    return <>
        <div 
            style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <h2 style={{ textAlign: 'center', marginBlock: 0 }}>Custom values</h2>
            {shouldDisplayEditor && <components.SolidButton
                text={'Clear colors'}
                className={'clear-custom-btn'}
                onClick={() => {
                    colors.clear();
                    
                    // Force rerender the inputs by setting away from Custom theme and back
                    // The timeout has no delay specified hence it just gets added to the event queue
                    setSelected(0);
                    setTimeout(() => setSelected(Theming.themes.findIndex(x => x.name === 'Custom')));
                }}
            />}
        </div>
        <div 
            style={{ 
                justifyContent: 'center',
                overflowY: 'scroll',
                flexWrap: 'wrap',
                display: 'flex'
            }}
        >
            {shouldDisplayEditor
                ? Object.keys(spec).map(key => {
                    return <>
                        <h3 style={{ marginBottom: '1rem !important' }}>
                            {capitalize(key)}
                        </h3>
                        {spec[key].map(color => {
                            return <ColorInput 
                                label={label}
                                color={`${key}-${color}`}
                                colorType={key}
                                colorKey={color}
                            />
                        })}
                    </>
                }) 
                : <p style={{ textAlign: 'center', maxWidth: '75%' }}>
                    Select the <strong>Custom</strong> theme from the dropdown above for these colors to be editable!
                </p>}
        </div>
    </>
}