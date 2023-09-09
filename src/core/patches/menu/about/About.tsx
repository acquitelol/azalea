import components from '@core/components';
import { common } from '@core/modules';

import utilities from '@core/utilities';
import manifest from '@extension/manifest.json';

const { React } = common;
const { repository, navigate } = utilities;

export default () => {
    return <>
        <h3>{manifest.description}</h3>
        <h4>Written by {manifest.author}. Version: {manifest.version}</h4>
        {'You can access the entire source code '}
        <a 
            href={repository.plain}
            target={'blank'}
        >
            here
        </a> 
        {' and the license '}
        <a 
            href={repository.plain + '/blob/main/LICENSE'}
            target={'blank'}
        >
            here
        </a>.
        {' You can also access the build workflows of the codebase '}
        <a 
            href={repository.plain + '/actions'}
            target={'blank'}
        >
            here
        </a>.
        <br />
        <br />
        <h4 style={{ marginBlock: 0 }}>
            Thank you for installing {manifest.name} ♡
        </h4>
        <components.SolidButton 
            text={'Back'}
            style={{ marginTop: 20 }}
            onClick={() => navigate(-1, { enabled: false })}
        />
    </>
}