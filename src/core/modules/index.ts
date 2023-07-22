import { exfiltratedModules, globalModules } from "./data";
import exfiltrate from "./exfiltrate";
import lazyModule from "@utilities/lazyModule";

import { CommonModules } from "@azalea/types";

const library = {};
export const common = new Proxy(library, {
    get(_, p) {
        return new Proxy(library[p] ?? {}, {
            get(_, mp) {
                return library[p]?.[mp]
            }
        })
    }
}) as CommonModules

// Load modules by exfiltrating them through `proto` magic
Object.entries(exfiltratedModules).forEach(([name, mdl]) => {
    exfiltrate(mdl.prop, mdl.filter)
        .then(res => Object.assign(library, { [name]: res }));
})

// Load modules by waiting until they're defined on `window`
Object.entries(globalModules).forEach(([name, prop]) => {
    lazyModule(() => window[prop], r => r !== undefined)
        .then(res => Object.assign(library, { [name]: res }));
})

// Use common[mdl] on its own only if you are *100%* sure that the module exists when you `get` any properties.
// If you are loading early, use await lazyModule(() => common[mdl]) to wait for the module to be found.
export default { exfiltrate, common };
