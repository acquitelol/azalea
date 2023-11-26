import { exfiltratedModules } from './data';
import exfiltrate from './exfiltrate';

import { CommonModules } from '@azalea/types';

export const common = new Proxy({}, {
    get(target, prop) {
        return new Proxy(target[prop] ?? {}, {
            get(_, moduleProp) {
                return target[prop]?.[moduleProp];
            }
        })
    }
}) as CommonModules;

// Load modules by exfiltrating them through Object.prototype
Object.entries(exfiltratedModules).forEach(([name, mdl]) => {
    exfiltrate(mdl.prop, mdl.filter)
        .then(res => Object.assign(common, { [name]: res }));
})

// Use common[mdl] on its own only if you are *100%* sure that the module exists when you `get` any properties.
// If you are loading early, use await lazyDefine(() => common[mdl]) to wait for the module to be found.
export default { exfiltrate, common };
