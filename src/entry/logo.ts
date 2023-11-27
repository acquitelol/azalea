import utilities from '@core/utilities';
import { storages } from '@core/handlers/state';

const { lazyDefine, getImage } = utilities;
const { preferences } = storages;

async function initializeLogo() {
    const sparxLogoContainer = await lazyDefine(() => document.querySelector('[class*="_SMLogo_"]'));
    const sparxLogo = sparxLogoContainer.childNodes[0] as HTMLImageElement;

    preferences.set('originalLogoUrl', sparxLogo.src);

    applyLogo(sparxLogo, {});
}

export function applyLogo(logo: HTMLImageElement, { url = preferences.get('customLogoUrl'), size = preferences.get('customLogoSize') }) {
    if (!logo) logo = document.querySelector('[class*="_SMLogo_"]').childNodes[0] as HTMLImageElement;

    if (preferences.get('shouldUseCustomLogo')) {
        logo.src = url || getImage('logo.png');
        logo.style.width = size || '50px';
    } else {
        logo.src = preferences.get('originalLogoUrl');
        logo.style.width = '150px';
    }
}

export default initializeLogo;