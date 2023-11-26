import Row, { SettingRow } from '@core/components/row';
import { common } from '@core/modules';
import Dividers from '@core/components/dividers';
import { useStorageValue } from '@core/hooks';
import { commonStyles, createStyleSheet } from '@core/stylesheet';
import components from '@core/components';
import { repository } from '@core/utilities/common';
import { SolidButton } from '@core/components/buttons';

const { React } = common;
const { merge, styles } = createStyleSheet({
    container: {
        paddingTop: '1em',
        overflow: 'hidden'
    },

    message: {
        marginInline: '1em',
        background: 'var(--palette-light-blue-20)'
    },
});

export default () => {
    const [localFetch, setLocalFetch] = useStorageValue<boolean>('localFetch', 'updater');
    const [, setResetUpdates] = useStorageValue<boolean>('resetUpdates', 'updater');

    return <>
        <div style={merge(x => [x.container, { background: 'var(--palette-light-blue-20)' }])}>
            <components.SectionBody style={commonStyles.merge(x => [x.textCenter, styles.message])}>
                <h2 style={{ marginBlock: '0.25em' }}>
                    Disclaimer
                </h2>
                <components.Dividers.Small />
                <p style={{ marginInline: '1em', marginBlock: '0.5em' }}>
                    Do not mess with these options unless <strong>you know what you're doing.</strong> Changing these at random could <strong>break your Azalea installation.</strong> If you need help fixing it, <a href={repository.plain + '/issues/new'}>raise an issue</a>.
                </p>
            </components.SectionBody>
        </div>
        <SettingRow 
            label={'Local fetch'}
            sublabel={'Attempts to fetch the bundle from the Chrome runtime. Only works if the extension is loaded in development mode, and a bundle is found locally to run.'}
            getter={localFetch}
            setter={setLocalFetch}
        />
        <Dividers.Small />
        <SettingRow 
            label={'Disable updates'} 
            sublabel={'Completely disables updates. This means that if something breaks and you would like to re-enable them, the updates will have to be enabled manually through the console.'}
            option={'updaterDisabled'} 
            store={'updater'} 
        />
        <Dividers.Small />
        <Row 
            label={'Reset Stores'}
            sublabel={'Resets the hash and bundle. Upon refresh, a completely new bundle and hash will be forcefully fetched and loaded, negating the currently installed ones.'}
            trailing={<SolidButton
                text={'Reset'}
                style={{ marginLeft: '0.5em' }}
                onClick={() => {
                    setResetUpdates(true);
                    window.location.reload();
                }}
            />}
        />
    </>
}