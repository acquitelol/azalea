import common from "@core/utilities/common";
import { storages } from "@core/handlers/state";

const { updater } = storages;

async function loadBundle(src: string, type: 'url' | 'raw' = 'url') {
    if (type === 'url') {
        const res = await fetch(src).then(r => r.text()).catch(console.error);

        typeof res === 'string' && eval(res);
    } else {
        typeof src === 'string' && eval(src);
    }
}

async function ensureCache(force = false, hash?: string) {
    if ((typeof updater.get('bundleCache') !== 'string') || force) {
        try {
            const bundleCache = await fetch(common.getFile('bundle.js'), { cache: 'no-cache' }).then(res => res.text())

            updater.set('bundleCache', bundleCache);

            if (hash) {
                updater.set('updateHash', hash);
            } else {
                const release = await fetch(common.repository.hash).then(res => res.json());
                updater.set('updateHash', release.object.sha);
            }

            return bundleCache;
        } catch (error) {
            alert(`Failed to fetch Azalea's bundle: ${error}`);
            console.error(error);
            return -1;
        }
    }

    return updater.get('bundleCache');
}

async function main() {
    let bundleCache: string | number;

    // If updater is disabled, ensure there is at least the current version of the bundle available
    if (updater.get('updaterDisabled')) {
        bundleCache = await ensureCache();
        return typeof bundleCache === 'string' && await loadBundle(bundleCache, 'raw');
    }

    bundleCache = await ensureCache();
    typeof bundleCache === 'string' && await loadBundle(bundleCache, 'raw');
}

main();
