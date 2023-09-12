import utilities from '@core/utilities';

const { lazyDefine, getImage } = utilities;

async function initializeLogo() {
    const sparxLogoContainer = await lazyDefine(() => document.querySelector('[class*="_SMLogo_g7mut_"]'));
    const sparxLogo = (sparxLogoContainer.childNodes[0] as HTMLImageElement);

    // Apply cuter logo
    sparxLogo.src = getImage('logo.png');
    sparxLogo.style.width = '50px';
}

export default initializeLogo;