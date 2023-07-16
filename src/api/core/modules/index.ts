import { exfiltratedModules, globalModules } from "./data";
import exfiltrate from "./exfiltrate";
import lazyModule from "../utilities/lazyModule";

const modules = {
    exfiltrate,
    common: {}
}

// Load modules by exfiltrating them by setting a prop
Object.entries(exfiltratedModules).forEach(([name, mdl]) => {
    modules.exfiltrate(mdl.prop, mdl.filter)
        .then(res => Object.assign(modules.common, { [name]: res }));
})

// Load modules by waiting until they're defined on `window`
Object.entries(globalModules).forEach(([name, mdl]) => {
    lazyModule(() => window[mdl.prop], r => r !== undefined)
        .then(res => Object.assign(modules.common, { [name]: res }));
})

export default modules;
