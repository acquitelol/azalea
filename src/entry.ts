import azalea from '@core';
import utilities from '@utilities'
import handlers from '@handlers'
import patcher from '@core/patcher';
import findReact from '@core/utilities/findReact';

const { name, lazyModule, getImage } = utilities;
const { Theming, storages: { preferences } } = handlers;

window.azalea = azalea;

if (window.__sparxweb) {
    window.__sparxweb.environment = 'development';
}

(async function () {
    // Initialization by applying preferences
    patcher.after('defineProperty', Object, (_, res: Record<PropertyKey, any>) => {
        if (res.data?.student && ['firstName', 'lastName'].every(k => k in res.data?.student)) {
            res.data.student.firstName = name.firstName;
            res.data.student.lastName = name.lastName;
        }
    })

    // Add a way to render custom content
    const container = await lazyModule(() => document.querySelector('[id="root"]'));
    const content = await lazyModule(() => container.childNodes[1]);
    const React = await lazyModule(() => azalea.modules.common.React);

    patcher.after('type', findReact(content as Element), (_, res) => {
        const [options, setOptions] = React.useState({ enabled: false });

        window.mutatePageOptions = setOptions;

        return options.enabled ? options.content : res;
    });

    const labelNode = await lazyModule(() => document.querySelector('[class*="_XPCount_g7mut_"]'));
    const sparxLogoContainer = await lazyModule(() => document.querySelector('[class*="_SMLogo_g7mut_"]'));
    const sparxLogo = (sparxLogoContainer.childNodes[0] as HTMLImageElement);

    // Apply cuter logo
    sparxLogo.src = getImage('logo.png');
    sparxLogo.style.width = '50px';

    preferences.get('themeIndex') ?? preferences.set('themeIndex', 0);
    preferences.get('autoBookwork') ?? preferences.set('autoBookwork', true);

    Theming.setTheme();
    Theming.applyLabel(labelNode);
})();