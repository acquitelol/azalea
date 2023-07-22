import { storages } from "@handlers/state"

const { preferences } = storages;

const name = {
    get firstName() {
        return preferences.get("shouldUseCuteName") 
            ? preferences.get("cuterFirstName") || "Rosie" 
            : preferences.get("firstName")
    },
    
    get lastName() {
        return preferences.get("shouldUseCuteName")
            ? preferences.get("cuterLastName") || ":3"
            : preferences.get("lastName")
    }
};

const repository = {
    plain: "https://github.com/acquitelol/azalea",
    raw: "https://raw.githubusercontent.com/acquitelol/azalea"
};
const getImage = (name: string) => `${repository.raw}/main/extension/assets/${name}`;
const capitalize = (s: string) => s.trim().replace(/^\w/, m => m.toUpperCase());
const noop = () => {};

export default {
    name,
    repository,
    getImage,
    capitalize,
    noop
}