export const correctOrder = val => {

    return val.split('-').sort().join('-');
};