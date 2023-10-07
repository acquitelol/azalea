import Row from '@core/components/row';
import { common } from '@core/modules';

import utilities from '@core/utilities';
import manifest from '@extension/manifest.json';

const { React } = common;
const { repository } = utilities;

export default () => {
    return <Row
        label={<>
            <h4>
                Written by{' '}
                <a href={repository.user} target='blank'>
                    {manifest.author}
                </a>. 
                Version {manifest.version}
            </h4>
            
            {'You can access the entire source code '}
            <a href={repository.plain} target={'blank'}>
                here
            </a>

            {' and the build workflows of the codebase '}
            <a href={repository.plain + '/actions'} target={'blank'}>
                here
            </a>.
        </>}
        extra={<h4>
            Thank you for installing {manifest.name} ♡
        </h4>}
    />
}