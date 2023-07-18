import bookworkBypass from "./bookworkBypass";
import dynamicSubmit from "./dynamicSubmit";
import menuButtons from "./menuButtons";

const patches = (async function() {
    return [
        await bookworkBypass(),
        await dynamicSubmit(),
        await menuButtons()
    ]
})()

export default patches;