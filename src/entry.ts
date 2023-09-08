import azalea from "@core";
import utilities from "@utilities"
import handlers from "@handlers"
import modules from "@modules";
import patcher from "@core/patcher";

const { name, lazyModule, getImage } = utilities;
const { Theming, storages: { preferences } } = handlers;

window.azalea = azalea;

(async function () {
    // Get rid of sentry
    if (window.__sparxweb) {
        window.__sparxweb.environment = 'development';
    }

    // Initialization by applying preferences
    patcher.after('defineProperty', Object, (_, res: Record<PropertyKey, any>) => {
        if (res.data?.student && ['firstName', 'lastName'].every(k => k in res.data?.student)) {
            res.data.student.firstName = name.firstName;
            res.data.student.lastName = name.lastName;
        }
    })

    const labelNode = await lazyModule(() => document.querySelector('[class*="_XPCount_g7mut_"]'));
    const sparxLogoContainer = await lazyModule(() => document.querySelector('[class*="_SMLogo_g7mut_"]'));
    const sparxLogo = (sparxLogoContainer.childNodes[0] as HTMLImageElement);

    // // Apply cuter logo
    sparxLogo!.src = getImage('logo.png');
    (sparxLogo as any).style = 'width: 50px';

    preferences.get("themeIndex") ?? preferences.set("themeIndex", 0);
    preferences.get("autoBookwork") ?? preferences.set("autoBookwork", true);

    Theming.setTheme();
    Theming.applyLabel(labelNode);
})();