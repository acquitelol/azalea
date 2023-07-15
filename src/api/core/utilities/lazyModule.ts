import common from "./common";

/**
 * Continuously tries to get a value from a callback and tries again every specific interval until successful
 * @param {function} cb The callback to return a value
 * @param {number} time The interval until trying again after failure in ms
 * @returns 
 */
async function lazyModule(cb, time = 100) {
    while (true) {
        if (cb().length > 0) return cb();;
        await common.wait(time)
    }
}

export default lazyModule;