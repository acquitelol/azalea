/**
 * @description Checks if an object is empty or not
 * @param {object} object - The object to check
 * @return {boolean}
 */
function isEmpty(object: Record<any, any>) {
    for (const _ in object) {
        return false;
    }

    return true;
}

export default isEmpty;