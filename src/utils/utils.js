/*
 * Not in use
 */
const RE_SCHAR = /[~!@#$%^&*()_+{}|:"<>?`\-=[\]\\;',./]+/g;

/*
 * Not in use
 */
export const correctOrder = val => {

    return val.split('-').sort().join('-');
};

/*
 * Not in use
 */
export const removeUAlpha = val => {
    return val.replace(/([A-Z]-[A-Z])|[A-Z]/g, '');
};

/*
 * Not in use
 */
export const removeLAlpha = val => {
    return val.replace(/([a-z]-[a-z])|[a-z]/g, '');
};

/*
 * Not in use
 */
export const removeNumbers = val => {
    return val.replace(/(\d-\d)|\d/g, '');
};

/*
 * Not in use
 */
export const removeSpecialChars = val => {
    return val.replace(RE_SCHAR, '');
};

/*
 * Set item from Local Storage
 * 
 * @params { String } key
 * @params { any } data - value to store
 * @returns undefined
 */
export const si = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

/*
 * Get item from Local Storage
 * 
 * @params { String } key
 * @params { any } altVal - Alternate value to return, if not found in LocalStorage
 * @returns { any } stored data
 */
export const gi = (key, altVal) => {
    var data = localStorage.getItem(key);
    data = data === null ? altVal : JSON.parse(data);
    return data;
};

/*
 * Remove item from Local Storage
 * 
 * @params { String } key 
 * @returns undefined
 */
export const ri = (key) => {
    localStorage.getItem(key) !== null && localStorage.removeItem(key);
};