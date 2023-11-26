import { common } from '@core/modules';

import { Section } from '@core/components/section';
import Dividers from '@core/components/dividers';

import About from './About';
import Toggles from './Toggles';
import Title from './Title';
import Themes from './themes';
import Updater from './Updater';

const { React } = common;

export default () => (
    <>
        <Title />

        <Dividers.Large />

        <Section 
            title='Preferences'
            style={{ marginTop: '1em' }}
        >
            <Toggles />
        </Section>

        <Section title='Themes'>
            <Themes />
        </Section>

        <Section title='Updater'>
            <Updater />
        </Section>

        <Section title='About'>
            <About />
        </Section>
    </>
);