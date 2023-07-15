import patcher from "./core/patcher";
import handlers from "./core/handlers";
import modules from "./core/modules";
import bookwork from "./core/bookwork";
import utilities from "./core/utilities";
import patches from "./core/patches";

const cutest = {
    patcher,
    modules: {
        ...modules,
        common: []
    },
    handlers,
    bookwork,
    utilities,
    patches
}

// Load modules by exfiltrating them by setting a prop
modules.data.forEach(module => {
    cutest.modules.common[module.name] = null;

    modules.exfiltrate(module.prop, module.filter)
        .then(res => (cutest.modules.common[module.name] = res));
})

export default cutest;