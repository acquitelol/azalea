import { storages } from "../handlers/state";

const { preferences } = storages;

const name = {
    get firstName() {
        return preferences.get("shouldUseCuteName") ? "Rosie" : preferences.get("firstName")
    },
    
    get lastName() {
        return preferences.get("shouldUseCuteName") ? ":3" : preferences.get("lastName")
    }
};

const repository = "https://raw.githubusercontent.com/acquitelol/azalea";
const getImage = (name: string) => `${repository}/main/extension/assets/${name}`;

export default {
    name,
    repository,
    getImage
}