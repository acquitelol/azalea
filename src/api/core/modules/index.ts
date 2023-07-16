import data from "./data";
import exfiltrate from "./exfiltrate";

const modules = {
    exfiltrate,
    data,
    common: data.map(mdl => mdl.name)
}

// Load modules by exfiltrating them by setting a prop
data.forEach(mdl => {
    modules.exfiltrate(mdl.prop, mdl.filter)
        .then(res => (modules.common[mdl.name] = res));
})

export default modules;
