import common from "./common";

/**
 * @description Continuously tries to get a value from a callback and tries again every specific interval until successful or max attempts reached.
 * @param {function} callback - The callback to the module. This should be a function that returns the module which is requested.
 * @param {function?} condition - Optional condition for the finder to return the module. By default, only truthiness of the module is checked.
 * @param {number?} maxAttempts - The maximum attempts that the finder can call until giving up and returning null. The default is 100.
 * @param {number?} time - The time to wait before trying to get the module from the callback again. The default is 100ms.
 * @return {Promise<T | null>} - Returns the module if found or null if max attempts were reached. This must be awaited.
 */
async function lazyModule<T>(callback: () => T, condition?: (result: T | null) => boolean, maxAttempts = 100, time = 100): Promise<T | null> {
    let attempt = 0;
    while (attempt < maxAttempts) {
        const result = callback();

        if (condition ? condition(result) : result) return result;
        await common.wait(time);

        attempt++;
    }

    return null;
}

export default lazyModule;