import data from "./data";
import exfiltrate from "./exfiltrate";

const modules = {
    exfiltrate,
    common: {}
}

// Load modules by exfiltrating them by setting a prop
Object.entries(data).forEach(([name, mdl]) => {
    modules.exfiltrate(mdl.prop, mdl.filter)
        .then(res => Object.assign(modules.common, { [name]: res }));
})

export default modules;
