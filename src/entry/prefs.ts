import patcher from '@core/patcher';
import utilities from '@core/utilities';
import handlers from '@handlers';

const { name, lazyDefine } = utilities;
const { Theming, storages: { preferences } } = handlers;

async function initializePrefs() {
    patcher.after('defineProperty', Object, (_, res: Record<PropertyKey, any>) => {
        if (res.data?.student && ['firstName', 'lastName'].every(k => k in res.data?.student)) {
            const { student } = res.data;

            preferences.set("firstName", student.firstName);
            preferences.set("lastName", student.lastName);

            student.firstName = name.firstName;
            student.lastName = name.lastName;
        }
    })

    const labelNode = await lazyDefine(() => document.querySelector('[class*="_XPCount_g7mut_"]'));

    preferences.get('themeIndex') ?? preferences.set('themeIndex', 0);
    preferences.get('autoBookwork') ?? preferences.set('autoBookwork', true);
    preferences.get('shouldUseCuteName') ?? preferences.set('shouldUseCuteName', false);

    Theming.setTheme();
    Theming.applyLabel(labelNode);
}

export default initializePrefs;