import { common } from '@modules';
import { useStorageValue } from '@core/hooks';
import { storages } from '@core/handlers/state';
import utilities from '@utilities';

import manifest from '@extension/manifest.json';
import Components from '@components';
import { BaseItem } from '@azalea/types';

const { React } = common;
const { repository, noop, name, getImage } = utilities;
const { preferences } = storages

const BookworkMessage = () => {
    return <p style={{ textAlign: 'center' }}>
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
}

const AboutMessage = () => {
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
    </>
}

const ToggleBookwork = () => {
    const [enabled, setEnabled] = useStorageValue<boolean>('autoBookwork', 'preferences');

    return <div 
        style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '0'
        }}
    >
        <h3 style={{ marginRight: '0.5em' }}>
            Autobookwork
        </h3>
        <Components.Button 
            text={enabled ? 'Disable' : 'Enable'}
            className={'special-btn'}
            onClick={() => setEnabled(previous => !previous)}
        />
    </div>
}

const NameInput = ({ type, label, placeholder }) => {
    const [value, setValue] = useStorageValue(type, 'preferences');
    
    return <div 
        style={{ 
            display: 'flex', 
            width: '100%', 
            justifyContent: 'center',
        }}
    >
        <p 
            style={{ 
                marginRight: '1rem',
                marginBlock: '0.4rem',
                flexGrow: 1,
                maxWidth: '30%'
            }}
        >
            {label}
        </p>
        <input 
            type={'text'}
            className={'revision-search'}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </div>
}

const NameInputs = () => {
    const [shouldUseCuteName, setShouldUseCuteName] = useStorageValue('shouldUseCuteName', 'preferences');

    return <>
        <div 
            style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 0
            }}
        >
            <h2 style={{ textAlign: 'center' }}>Anonymize name</h2>
            <Components.Button
                text={shouldUseCuteName ? 'Disable' : 'Enable'}
                className={'clear-custom-btn'}
                onClick={() => setShouldUseCuteName(previous => !previous)}
            />
        </div>
        <div 
            style={{ 
                justifyContent: 'center',
                overflowY: 'scroll',
                flexWrap: 'wrap',
                display: 'flex'
            }}
        >
            <NameInput 
                type={'cuterFirstName'} 
                label={'First Name'} 
                placeholder={name.defaults.firstName}
            />
            <NameInput 
                type={'cuterLastName'} 
                label={'Last Name'}
                placeholder={name.defaults.lastName}
            />
        </div>
    </>
}

const Buttons = () => {
    return <div style={{ display: 'flex', marginBottom: '2em' }}>
        {/* <EndAlertButton 
            text={'About'}
            trailing={<Arrows.Right />}
            className={'special-btn'}
            onClick={() => Redux.dispatch({
                type: 'START_ALERT',
                alert: Immutable.Map({
                    title: manifest.name,
                    message: <AboutMessage />
                })
            })}
        />
        <EndAlertButton 
            text={'Open garden'}
            className={'cycle-theme-btn'}
            onClick={() => Redux.dispatch({
                type: 'SELECT_GAME',
                gameType: 'gardengame'
            })}
        /> */}
        <Components.Button 
            text={'Done'}
            trailing={<Components.Arrows.Right />}
            className={'cycle-theme-btn'}
            onClick={() => mutatePageOptions({ enabled: false })}
        />
    </div>
}

const Settings = () => (
    <>
        <ToggleBookwork />
        <NameInputs />
        <br />
        <Buttons />
    </>
);

export default class Item implements BaseItem {
    text = 'Settings';
    callback() {
        mutatePageOptions({ 
            enabled: true,
            content: <Settings />
        })
    }
}