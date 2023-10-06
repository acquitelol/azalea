import utilities from '@core/utilities';
import manifest from '@extension/manifest.json';
import components from '@core/components';
import { createStyleSheet, commonStyles } from '@stylesheet';
import { common } from '@core/modules';

import Row from '@core/components/row';

const { React } = common;
const { Section, SolidButton } = components;
const { getImage, navigate } = utilities;
const { styles } = createStyleSheet({
    section: {
        marginTop: '1.5em', 
        marginBottom: '0.5em' 
    }
})

export default () => {
    return <Section collapsable={false} style={styles.section}>
        <Row 
            label={<div 
                style={commonStyles.merge(x => [x.flex, x.align])}
            >
                <h1>Welcome to Azalea! :3</h1>
                <SolidButton
                    text='Back'
                    style={{ marginLeft: 10 }}
                    onClick={() => navigate(-1, null)}
                />
            </div>}
            sublabel={manifest.description}
            trailing={<img 
                src={getImage('logo.png')} 
                style={{ width: '4em' }}
                alt="Sparx Maths"
            />}
        />
    </Section>
}