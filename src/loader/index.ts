import { storages } from "@core/handlers/state";
import logger from "@core/logger";

const { updater } = storages;

function loadElement<T extends Element>(element: T) {
    (document.body || document.head || document.documentElement).appendChild(element);
}

function loadScriptFromURL(src: string, async = false) {
    const script = document.createElement('script');

    script.src = src;
    script.async = async;
    script.defer = false;

    loadElement(script);
}

function loadStylesheetFromURL(src: string, id = 'stylesheet') {
    const link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = src;
    link.id = id;

    loadElement(link);
}

loadStylesheetFromURL(chrome.runtime.getURL('core.css'), 'azalea-core-styles');
loadStylesheetFromURL(chrome.runtime.getURL('cute.css'), 'azalea-theme-styles');

logger.info('Loading Azalea...');

chrome.runtime.sendMessage({
    type: 'inject-azalea',

    // Force update if the user chose to reset updates
    update: updater.get('resetUpdates') || !updater.get('updaterDisabled'),
    reset: updater.get('resetUpdates'),
    local: updater.get('localFetch')
});

if (updater.get('resetUpdates')) {
    updater.set('resetUpdates', false);
}

if (updater.get('localFetch')) {
    fetch(chrome.runtime.getURL('bundle.js')).catch(() => {
        updater.set('localFetch', false);
        location.reload();
    });
}