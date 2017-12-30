const RE_SCHAR = /[~!@#$%^&*()_+{}|:"<>?`\-=[\]\\;',./]+/g;

export const correctOrder = val => {

    return val.split('-').sort().join('-');
};
export const removeUAlpha = val => {
    return val.replace(/([A-Z]-[A-Z])|[A-Z]/g, '');
};
export const removeLAlpha = val => {
    return val.replace(/([a-z]-[a-z])|[a-z]/g, '');
};
export const removeNumbers = val => {
    return val.replace(/(\d-\d)|\d/g, '');
};
export const removeSpecialChars = val => {
    return val.replace(RE_SCHAR, '');
};