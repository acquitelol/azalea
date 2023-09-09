import patcher from '@core/patcher';
import utilities from '@core/utilities';
import handlers from '@handlers';

const { name, lazyModule } = utilities;
const { Theming, storages: { preferences } } = handlers;

async function initializePrefs() {
    patcher.after('defineProperty', Object, (_, res: Record<PropertyKey, any>) => {
        if (res.data?.student && ['firstName', 'lastName'].every(k => k in res.data?.student)) {
            res.data.student.firstName = name.firstName;
            res.data.student.lastName = name.lastName;
        }
    })

    const labelNode = await lazyModule(() => document.querySelector('[class*="_XPCount_g7mut_"]'));

    preferences.get('themeIndex') ?? preferences.set('themeIndex', 0);
    preferences.get('autoBookwork') ?? preferences.set('autoBookwork', true);

    Theming.setTheme();
    Theming.applyLabel(labelNode);
}

export default initializePrefs;