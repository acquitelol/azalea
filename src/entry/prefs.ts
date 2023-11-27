import patcher from '@core/patcher';
import utilities from '@core/utilities';
import handlers from '@handlers';

const { name, lazyDefine } = utilities;
const { Theming, storages: { preferences } } = handlers;

const defaults = {
    themeIndex: 0,
    autoBookwork: true,
    shouldUseCuteName: false,
    shouldUseCustomLogo: false,
    logger: true
}

async function initializePrefs() {
    Object.entries(defaults)
        .forEach(([key, value]) => {
            preferences.get(key) ?? preferences.set(key, value)
        });

    patcher.after('defineProperty', Object, (_, res: Record<PropertyKey, any>) => {
        if (res.data?.student && ['firstName', 'lastName'].every(k => k in res.data?.student)) {
            const { student } = res.data;

            preferences.set('firstName', student.firstName);
            preferences.set('lastName', student.lastName);

            student.firstName = name.firstName;
            student.lastName = name.lastName;
        }
    })

    const labelNode = await lazyDefine(() => document.querySelector('[class*="_XPCount_"]'));

    Theming.setTheme();
    Theming.applyLabel(labelNode);
}

export default initializePrefs;