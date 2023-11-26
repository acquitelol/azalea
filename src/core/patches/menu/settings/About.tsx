import Dividers from '@core/components/dividers';
import Row from '@core/components/row';
import { common } from '@core/modules';
import { createStyleSheet } from '@core/stylesheet';

import utilities from '@core/utilities';
import manifest from '@extension/manifest.json';

const { React } = common;
const { repository } = utilities;
const { merge, styles } = createStyleSheet({
    top: {
        marginTop: '0.5em'
    },

    bottom: {
        marginBottom: '0.5em'
    }
})

export default () => {
    return <Row
        label={<>
            <div style={styles.bottom}>
                <h4>
                    Written by{' '}
                    <a href={repository.user} target='blank'>
                        {manifest.author}
                    </a>. 
                    Version {manifest.version}
                </h4>
                
                <p style={{ marginBlock: 0 }}>
                    <a href={repository.plain} target={'blank'}>
                        Source
                    </a>

                    {' | '}

                    <a href={repository.plain + '/actions'} target={'blank'}>
                        Workflows
                    </a>

                    {' | '}

                    <a href={repository.plain + '/releases'} target={'blank'}>
                        Releases
                    </a>

                    {' | '}

                    <a href={repository.plain + '#-features-provided-by-the-extension'} target={'blank'}>
                        Features
                    </a>
                </p>
            </div>

            <Dividers.Small />

            <div style={merge(x => [x.top, x.bottom])}>
                <p style={{ marginBlock: 0 }}>
                    Copyright © 2023 {' '}
                    <a href={repository.user} target='blank'>
                        {manifest.author} (acquitelol)
                    </a>
                    . All rights reserved.
                </p>
            </div>

            <Dividers.Small />

            <div style={merge(x => [x.top, x.bottom])}>
                <p style={{ marginBlock: 0 }}>
                    <strong>This extension is not licensed under any circumstances.</strong> 
                    <br />
                    Any projects which look the same as {manifest.name} but are not branded the same or are not authored by {manifest.author} are <strong>stolen content</strong>.
                    <br />
                    Furthermore, any which look the same as {manifest.name} but were not downloaded from <a href={repository.plain + '/releases'} target='blank'>official sources</a> may contain <strong>malware</strong>.
                </p>
            </div>

            <Dividers.Small />

            <div style={styles.top}>
                <p style={{ marginBlock: 0 }}>
                    <strong>To request usage of any code or report violating content:</strong>
                    <br />
                    <ul style={{ marginBlock: '0.25em', paddingLeft: '2em' }}>
                        <li>↝ Contact <strong>acquitefx@gmail.com</strong> via Email</li>
                        <br />
                        <li>↝ Contact <strong>rosie.pie</strong> or <strong>rosie.nya</strong> via Discord</li>
                        <br />
                        <li>↝ <a href={repository.plain + '/issues/new'}>Raise an issue</a> via the GitHub repository</li>
                    </ul>
                </p>
            </div>
        </>}
        extra={<div style={{ marginBlock: '0.25em' }}>
            <p style={{ marginBlock: 0 }}>
                Please <strong>be cautious</strong> and only ever download {manifest.name} from <strong>
                    <a href={repository.plain + '/releases'} target='blank'>official sources</a>
                </strong>.
            </p>
            <h4>
                Thank you for installing my extension ♡
            </h4>
        </div>}
    />
}