import modules from "./modules";
import { storages } from "@handlers/state";

const { React } = modules.common;

/**
 * @description Implements raw statefulness to a storage key-value pair.
 * @param {string} key - The key to access from the storage.
 * @param {storages} store - The store to get the value from with the key provided
 * @return {get, set} - Getting and setting the LocalStorage value statefully.
 */
export const useStorageValue = <T extends any>(key: string, store: keyof typeof storages) => {
    const [value, setValue]: [T, (arg: T | ((previous: T) => T)) => void] = React.useState(storages[store].get(key))

    React.useLayoutEffect(() => {
        storages[store].set(key, value);
    }, [value]);

    return [value, setValue] as const;
}