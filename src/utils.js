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

export const si = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};
export const gi = (key) => {
    var data = localStorage.getItem(key);
    data = data === null ? data : JSON.parse(data);
    console.log(key, typeof data, data);
    return data;
};