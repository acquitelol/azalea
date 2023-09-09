import components from '@core/components';
import utilities from '@core/utilities';
import { common } from '@core/modules';
import { storages } from '@core/handlers/state';

const { React } = common;
const { preferences } = storages;
const { navigate } = utilities;

export default () => {
    return <>
        <p style={{ textAlign: 'center' }}>
            With Auto-bookwork disabled, <strong>Answers will no longer be submitted automatically</strong> if the answer provided matches a bookwork-check option.
            <br />
            <br />
            They will still be <strong>saved</strong> and <strong>displayed in bookwork checks</strong> for you to choose manually.
            <br />
            <p
                style={{
                    fontSize: '2rem',
                    marginBottom: '0'
                }}
            >
                Current status: <strong>{preferences.get('autoBookwork') ? 'Enabled' : 'Disabled'}</strong>.
            </p>
        </p>

        <components.SolidButton 
            text={'Back'}
            style={{ marginTop: 20 }}
            onClick={() => navigate(-1, { enabled: false })}
        />
    </>
}