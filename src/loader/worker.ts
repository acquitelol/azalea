// Thank you to Shelter, this code is essentially taken directly from them <3
// https://github.com/uwu/shelter/blob/main/injectors/mv3/worker.js
const hashUrl = 'https://api.github.com/repos/acquitelol/azalea/git/refs/heads/sparx-v2';
const bundleUrl = 'https://raw.githubusercontent.com/acquitelol/azalea/sparx-v2/builds/bundle.js';

function promisifiedGet<T extends string[]>(...args: T): Promise<{ [K in T[number]]: any }> {
    return new Promise((res) => chrome.storage.local.get(...args, res))
};

function getProxiedPath(url: string) {
    return `https://corsproxy.io/?${encodeURIComponent(url)}`
}

async function fetchAzalea() {
    console.info('Fetching Azalea\'s bundle...');

    return await fetch(getProxiedPath(bundleUrl))
        .then(r => r.text())
        .catch((error) => {
            console.error(error);
            return '';
        });
}

async function updateAzalea(tabId) {
    console.info('Checking for updates...');

    const ref = await fetch(getProxiedPath(hashUrl)).then(r => r.json());

    if (ref.object.sha !== (await promisifiedGet('azaleaHash')).azaleaHash) {
        console.info('Update found! Attempting to override bundle...');

        await chrome.storage.local.set({ azaleaHash: ref.object.sha });
        const [{ azalea }, newAzalea] = await Promise.all([promisifiedGet('azalea'), fetchAzalea()]);

        if (azalea === newAzalea) return console.info('Bundles are identical, will not override...');

        console.info('Overriding Azalea\'s bundle...');

        await chrome.storage.local.set({ azalea: newAzalea });

        console.info('Successfully updated! Refreshing...');

        return inject(tabId, `location.reload()`);
    }

    console.info('No updates found.');
}

function inject(tabId, code, detachOnFinish = true) {
    console.info('Evaluating code at tabId:', tabId, { code });

    chrome.debugger.attach({ tabId }, '1.3', () => {
        chrome.debugger.sendCommand(
            { tabId },
            'Runtime.evaluate',
            {
                expression: code,
                allowUnsafeEvalBlockedByCSP: true,
            },
            () => detachOnFinish && chrome.debugger.detach({ tabId })
        );
    });
}

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
    try {
        sendResponse();

        if (msg.includes('inject-azalea')) {
            const loader = await fetch(chrome.runtime.getURL('loader.js')).then(r => r.text());
            const { azalea } = await promisifiedGet('azalea');

            if (azalea) {
                inject(
                    sender.tab.id,
                    loader.replace('/extid/', chrome.runtime.id).replace('INJECT_AZALEA_SOURCE', azalea),
                );
            }

            if (msg.includes('no-update')) {
                console.info('Updates are disabled.')
            } else {
                await updateAzalea(sender.tab.id);
            }
        }
    } catch (e) {
        throw new Error('Failed to load Azalea: ' + e);
    }
});