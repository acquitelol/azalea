import Theming, { spec } from '@core/handlers/theming';
import components from '@core/components';
import utilities from '@core/utilities';
import { common } from '@core/modules';
import { createStyleSheet, commonStyles } from '@stylesheet';
import { storages } from '@core/handlers/state';

import ColorInput from './ColorInput';

import { ColorInputsProps } from '@azalea/themes';
import { Section } from '@core/components/section';
import Dividers from '@core/components/dividers';

const { React } = common;
const { colors } = storages;
const { capitalize } = utilities;
const { styles } = createStyleSheet({
    title: { 
        marginBlock: 0
    },

    button: {
        marginLeft: 10
    },

    fallback: {
        maxWidth: '75%'
    }
})

export default ({ selected, setSelected, label }: ColorInputsProps) => {
    const shouldDisplayEditor = React.useMemo(() => Theming.themes[selected].name === 'Custom', [selected])

    return <>
        <div style={commonStyles.merge(x => [x.flex, x.justify, x.align, { marginTop: '0.5em' }])}>
            <h2 style={commonStyles.merge(x => [x.textCenter, styles.title])}>Custom values</h2>
            {shouldDisplayEditor && <components.SolidButton
                text={'Clear colors'}
                style={styles.button}
                onClick={() => {
                    colors.clear();
                    
                    // Force rerender the inputs by setting away from Custom theme and back
                    // The timeout has no delay specified hence it just gets added to the event queue
                    setSelected(Theming.themes.findIndex(x => x.name === 'Pink'));
                    setTimeout(() => setSelected(Theming.themes.findIndex(x => x.name === 'Custom')));
                }}
            />}
        </div>
        <div style={shouldDisplayEditor ? {} : commonStyles.merge(x => [x.flex, x.justify])}>
            {shouldDisplayEditor
                ? Object.keys(spec).map(key => {
                    return <Section title={capitalize(key)}>
                        {spec[key].map((color, i, array) => {
                            return <>
                                <ColorInput 
                                    label={label}
                                    color={`${key}-${color}`}
                                    colorType={key}
                                    colorKey={color}
                                    backgroundColor={i % 2 === 0 ? '--palette-light-grey' : '--palette-light-blue-20'}
                                />
                                {i !== array.length - 1 && <Dividers.Small />}
                            </>
                        })}
                    </Section>
                }) 
                : <p style={commonStyles.merge(x => [x.textCenter, styles.fallback])}>
                    Select the <strong>Custom</strong> theme from the dropdown above for these colors to be editable!
                </p>}
        </div>
    </>
}