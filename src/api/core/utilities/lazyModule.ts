import common from "./common";

/**
 * Continuously tries to get a value from a callback and tries again every specific interval until successful
 * @param {function} cb The callback to return a value
 * @param {number} time The interval until trying again after failure in ms
 * @returns 
 */
async function lazyModule<T>(callback: () => T, condition?: (result) => boolean, time = 100): Promise<NonNullable<T>> {
    while (true) {
        const result = callback();
        
        // @ts-ignore ~ Assume you know more than the linter and that the result cannot be null.
        if (condition ? condition(result) : result) return result;
        await common.wait(time)
    }
}

export default lazyModule;