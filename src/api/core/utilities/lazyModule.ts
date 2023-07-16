import common from "./common";


/**
 * Continuously tries to get a value from a callback and tries again every specific interval until successful
 * @returns Promise<T | null>
 */
async function lazyModule<T extends () => any>(callback: () => ReturnType<T>, condition?: (result) => boolean, maxAttempts = 100, time = 100): Promise<ReturnType<T> | null> {
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