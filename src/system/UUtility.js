/**
 * Process to compatible to match string function.
 * @param value
 * @returns {*}
 */
export const convertStringHaveSpecialChars = (value) => {
    return value.trim()
        .replace('\\', '\\\\')
        .replace('*', '\\*')
        .replace('|', '\\|')
        .replace('(', '\\(')
        .replace(')', '\\)')
        .replace('[', '\\[')
        .replace(']', '\\]')
        .replace('{', '\\{')
        .replace('}', '\\}')
        .replace('+', '\\+');
};
