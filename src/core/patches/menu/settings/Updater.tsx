import Row, { SettingRow } from '@core/components/row';
import { common } from '@core/modules';
import utilities from '@core/utilities';
import Dividers from '@core/components/dividers';
import components from '@core/components';
import { useStorageValue } from '@core/hooks';

const { React } = common;
const { repository, getFile } = utilities;

export default () => {
    const [status, setStatus] = React.useState(null);
    const [updateHash, setUpdateHash] = useStorageValue<string>('updateHash', 'updater');
    const [localFetch, setLocalFetch] = useStorageValue<boolean>('localFetch', 'updater');
    const [, setBundleCache] = useStorageValue<string>('bundleCache', 'updater');

    return <>
        <SettingRow 
            label={'Local fetch'}
            sublabel={'Attempts to fetch the bundle from the Chrome runtime. Only works if the extension is loaded in development mode, and a bundle is found locally to run.'}
            getter={localFetch}
            setter={setLocalFetch}
        />
        <Dividers.Small />
        <div style={{ pointerEvents: localFetch ? 'none' : 'auto', opacity: localFetch ? 0.5 : 1 }}> 
            <SettingRow 
                label={'Disable updates'} 
                sublabel={'Completely disables updates. This takes precendence over all other options.'}
                option={'updaterDisabled'} 
                store={'updater'} 
            />
            <Dividers.Small />
            <Row 
                label='Manage updates' 
                sublabel='Allows you to check for updates and override the old bundle with the new one.'
                trailing={<components.SolidButton 
                    text='Search'
                    onClick={async () => {
                        const res = await fetch(repository.hash, { cache: 'no-cache' }).then(res => res.json());

                        if (res.object?.sha !== updateHash) {
                            const bundleCache = await fetch(getFile('bundle.js'), { cache: 'no-cache' }).then(res => res.text())

                            setUpdateHash(res.object.sha);
                            setBundleCache(bundleCache);

                            setStatus(true)
                        } else {
                            setStatus(false)
                        }
                    }}
                />}
            />
            {status !== null && <>
                <Dividers.Small />
                <Row 
                    label={status ? 'Update found!' : 'No updates found.'}
                    sublabel={status ? 'Please refresh the page for any changes to take effect.' : 'Azalea has had no updates since the last version you installed.'}
                    trailing={<components.SolidButton 
                        text={status ? 'Refresh' : 'Close'}
                        onClick={() => status ? window.location.href = window.location.href.replace(/azalea\/.*/g, '') : setStatus(null)}
                    />}
                />
            </>}
        </div>
    </>
}