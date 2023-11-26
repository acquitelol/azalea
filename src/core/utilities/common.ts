import { storages } from '@handlers/state';

const { preferences } = storages;

const name = {
    defaults: {
        firstName: 'Rosie',
        lastName: ':3'
    },

    get firstName() {
        return preferences.get('shouldUseCuteName')
            ? preferences.get('cuterFirstName') || this.defaults.firstName
            : preferences.get('firstName')
    },

    get lastName() {
        return preferences.get('shouldUseCuteName')
            ? preferences.get('cuterLastName') || this.defaults.lastName
            : preferences.get('lastName')
    }
};

const repository = {
    user: 'https://github.com/acquitelol',

    get plain() {
        return this.user + '/azalea';
    },

    hash: 'https://api.github.com/repos/acquitelol/azalea/git/refs/heads/sparx-v2',
    download: 'https://github.com/acquitelol/azalea/releases/latest/download',
    raw: 'https://raw.githubusercontent.com/acquitelol/azalea',
};

const getImage = (name: string) => `${repository.raw}/sparx-v2/extension/assets/${name}`;
const getFile = (name: string) => `${repository.download}/${name}`;
const capitalize = (s: string) => s.trim().replace(/^\w/, m => m.toUpperCase());
const noop = () => { };

export default {
    name,
    repository,
    getImage,
    getFile,
    capitalize,
    noop
}