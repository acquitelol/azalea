import modules from "./modules";
import { storages } from "@handlers/state";

const { React } = modules.common;

export const useStorageValue = <T extends any>(key: string, store: keyof typeof storages) => {
    const [value, setValue]: [T, (arg: T | ((previous: T) => T)) => void] = React.useState(storages[store].get(key))

    React.useLayoutEffect(() => {
        storages[store].set(key, value);
    }, [value]);

    return [value, setValue] as const;
}