import { exfiltratedModules, globalModules } from "./data";
import exfiltrate from "./exfiltrate";
import lazyModule from "../utilities/lazyModule";

type KeyOf<T extends Record<string, any>> = keyof T;
type CommonModules = Record<
    KeyOf<typeof exfiltratedModules> | KeyOf<typeof globalModules>,
    Record<string, any>
>

const modules = {
    exfiltrate,
    common: {} as CommonModules
}

// Load modules by exfiltrating them through `proto` magic
Object.entries(exfiltratedModules).forEach(([name, mdl]) => {
    modules.exfiltrate(mdl.prop, mdl.filter)
        .then(res => Object.assign(modules.common, { [name]: res }));
})

// Load modules by waiting until they're defined on `window`
Object.entries(globalModules).forEach(([name, prop]) => {
    lazyModule(() => window[prop], r => r !== undefined)
        .then(res => Object.assign(modules.common, { [name]: res }));
})

export default modules;
