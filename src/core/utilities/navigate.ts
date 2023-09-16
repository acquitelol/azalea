/**
 * Navigates to the path provided with an optional, opt-out prefix of /student
 * @param {string | number} path
 * @param {object?} prefix
 * @returns void
 */
function navigate(
    path: string | number,
    prefix = '/student'
) {
    azalea.navigation.navigator.go(prefix ? `${prefix}${path}` : path);
}

export default navigate;