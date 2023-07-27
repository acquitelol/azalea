import { exfiltratedModules, globalModules } from "./data";
import exfiltrate from "./exfiltrate";
import lazyModule from "@utilities/lazyModule";

import { CommonModules } from "@azalea/types";

export const common = new Proxy({}, {
    get(target, prop) {
        return new Proxy(target[prop] ?? {}, {
            get(_, moduleProp) {
                return target[prop]?.[moduleProp];
            }
        })
    }
}) as CommonModules;

// Load modules by exfiltrating them through `proto` magic
Object.entries(exfiltratedModules).forEach(([name, mdl]) => {
    exfiltrate(mdl.prop, mdl.filter)
        .then(res => Object.assign(common, { [name]: res }));
})

// Load modules by waiting until they're defined on `window`
Object.entries(globalModules).forEach(([name, prop]) => {
    lazyModule(() => window[prop], r => r !== undefined)
        .then(res => Object.assign(common, { [name]: res }));
})

// Use common[mdl] on its own only if you are *100%* sure that the module exists when you `get` any properties.
// If you are loading early, use await lazyModule(() => common[mdl]) to wait for the module to be found.
export default { exfiltrate, common };
