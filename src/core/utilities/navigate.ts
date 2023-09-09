/**
 * Navigates to the path provided with an optional, opt-out prefix of /student
 * @param {string | number} path
 * @param {object} prefix
 * @returns void
 */
function navigate(
    path: string | number,
    _prefix: Record<string, any> = { enabled: true, prefix: '/student' }
) {
    const { enabled, prefix } = _prefix;
    azalea.navigation.navigator.go(enabled ? `${prefix}${path}` : path);
}

export default navigate;