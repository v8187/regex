import { catVal, _find, _props, rndWrapper } from './utils';

const CHARS = 'fsde',
    SPLITTED_CHARS = CHARS.split('').map(char => {
        return catVal('lowerAlpha', char);
    });
let dummyData = catVal('lowerAlpha', CHARS),
    wpr = rndWrapper(dummyData);

describe('CategorizedValue: If "Is Constant" is checked', () => {

    beforeEach(() => {
        _find(wpr, 'isConstant').simulate('change', { target: { checked: false } });
    });

    test('uncheck the "Can Split" control', () => {

        expect(wpr.state().data.canSplit).toBeFalsy();
        _find(wpr, 'canSplit').simulate('change', { target: { checked: true } });
        expect(wpr.state().data.canSplit).toBeTruthy();
        _find(wpr, 'isConstant').simulate('change', { target: { checked: true } });
        expect(wpr.state().data.splitted).toBeFalsy();
    });

    test('hides the "Can Split" control', () => {

        expect(_find(wpr, 'canSplit').length).toBe(1);
        _find(wpr, 'isConstant').simulate('change', { target: { checked: true } });
        expect(_find(wpr, 'canSplit').length).toBe(0);
    });

    test('hides the "Splitted" controls', () => {

        expect(wpr.state().data.splitted).toBeNull();
        _find(wpr, 'canSplit').simulate('change', { target: { checked: true } });
        expect(wpr.state().data.splitted).toEqual(SPLITTED_CHARS);
        _find(wpr, 'isConstant').simulate('change', { target: { checked: true } });
        expect(wpr.state().data.splitted).toBeNull();
    });

    test('hides the "Alternate Values" control', () => {

        expect(_find(wpr, 'alternateValues').length).toBe(1);
        _find(wpr, 'isConstant').simulate('change', { target: { checked: true } });
        expect(_find(wpr, 'alternateValues').length).toBe(0);
    });

    test('shows the "Min length" controls', () => {
        _find(wpr, 'canSplit').simulate('change', { target: { checked: true } });
        expect(_find(wpr, 'minLength').length).toBe(0);
        _find(wpr, 'isConstant').simulate('change', { target: { checked: true } });
        expect(_find(wpr, 'minLength').length).toBe(1);
    });

    test('shows and disables the "Max length" controls', () => {
        _find(wpr, 'canSplit').simulate('change', { target: { checked: true } });
        expect(_find(wpr, 'maxLength').length).toBe(0);
        _find(wpr, 'isConstant').simulate('change', { target: { checked: true } });
        expect(_find(wpr, 'maxLength').length).toBe(1);
        expect(_props(wpr, 'maxLength').disabled).toBeTruthy();
    });

    test('"Max length" should be equal "Chars" length', () => {

        _find(wpr, 'maxLength').simulate('change', { target: { value: CHARS.length + 10 } });
        expect(wpr.state().data.maxLength).toBe(CHARS.length + 10);
        _find(wpr, 'isConstant').simulate('change', { target: { checked: true } });
        expect(wpr.state().data.maxLength).toBe(CHARS.length);
    });
});

describe('CategorizedValue: If "Is Constant" is unchecked', () => {

    beforeEach(() => {
        _find(wpr, 'isConstant').simulate('change', { target: { checked: true } });
    });

    test('shows the "Can Split" control', () => {

        expect(_find(wpr, 'canSplit').length).toBe(0);
        _find(wpr, 'isConstant').simulate('change', { target: { checked: false } });
        expect(_find(wpr, 'canSplit').length).toBe(1);
    });

    test('shows the "Alternate Values" control', () => {

        expect(_find(wpr, 'alternateValues').length).toBe(0);
        _find(wpr, 'isConstant').simulate('change', { target: { checked: false } });
        expect(_find(wpr, 'alternateValues').length).toBe(1);
    });
});

describe('CategorizedValue: If "Can Split" is checked', () => {

    beforeEach(() => {
        _find(wpr, 'canSplit').simulate('change', { target: { checked: false } });
    });

    test('hides the "Alternate Values" control', () => {

        expect(_find(wpr, 'alternateValues').length).toBe(1);
        _find(wpr, 'canSplit').simulate('change', { target: { checked: true } });
        expect(_find(wpr, 'alternateValues').length).toBe(0);
    });

    test('disables the "Min" and "Max" length controls', () => {

        expect(_find(wpr, 'minLength').length).toBe(1);
        expect(_find(wpr, 'maxLength').length).toBe(1);
        _find(wpr, 'canSplit').simulate('change', { target: { checked: true } });
        expect(_find(wpr, 'minLength').length).toBe(0);
        expect(_find(wpr, 'maxLength').length).toBe(0);
    });

    test('shows the "Splitted" controls', () => {

        expect(wpr.state().data.splitted).toBeNull();
        _find(wpr, 'canSplit').simulate('change', { target: { checked: true } });
        expect(wpr.state().data.splitted).toEqual(SPLITTED_CHARS);
    });
});

describe('CategorizedValue: If "Can Split" is unchecked', () => {

    beforeEach(() => {
        _find(wpr, 'canSplit').simulate('change', { target: { checked: true } });
    });

    test('shows the "Alternate Values" control', () => {

        expect(_find(wpr, 'alternateValues').length).toBe(0);
        _find(wpr, 'canSplit').simulate('change', { target: { checked: false } });
        expect(_find(wpr, 'alternateValues').length).toBe(1);
    });

    test('shows the "Min" and "Max" length controls', () => {

        expect(_find(wpr, 'minLength').length).toBe(0);
        expect(_find(wpr, 'maxLength').length).toBe(0);
        _find(wpr, 'canSplit').simulate('change', { target: { checked: false } });
        expect(_find(wpr, 'minLength').length).toBe(1);
        expect(_find(wpr, 'maxLength').length).toBe(1);
    });

    test('hides the "Splitted" controls', () => {

        expect(wpr.state().data.splitted).toEqual(SPLITTED_CHARS);
        _find(wpr, 'canSplit').simulate('change', { target: { checked: false } });
        expect(wpr.state().data.splitted).toBeNull();
    });
});

describe('CategorizedValue: If "Optional" is checked', () => {

    beforeEach(() => {
        _find(wpr, 'isOptional').simulate('change', { target: { checked: false } });
    });

    test('"Min Length" value should be 0', () => {

        expect(wpr.state().data.minLength).toEqual(1);
        _find(wpr, 'isOptional').simulate('change', { target: { checked: true } });
        expect(wpr.state().data.minLength).toEqual(0);
    });

    test('disables the "Min" length controls', () => {

        expect(_props(wpr, 'minLength').disabled).toBeFalsy();
        _find(wpr, 'isOptional').simulate('change', { target: { checked: true } });
        expect(_props(wpr, 'minLength').disabled).toBeTruthy();
    });
});

describe('CategorizedValue: If "Optional" is unchecked', () => {

    beforeEach(() => {
        _find(wpr, 'isOptional').simulate('change', { target: { checked: true } });
    });

    test('"Min Length" value should be 1', () => {

        expect(wpr.state().data.minLength).toEqual(0);
        _find(wpr, 'isOptional').simulate('change', { target: { checked: false } });
        expect(wpr.state().data.minLength).toEqual(1);
    });

    test('disables the "Min" length controls', () => {

        expect(_props(wpr, 'minLength').disabled).toBeTruthy();
        _find(wpr, 'isOptional').simulate('change', { target: { checked: false } });
        expect(_props(wpr, 'minLength').disabled).toBeFalsy();
    });
});

describe('CategorizedValue: On "Min Length" change', () => {

    beforeAll(() => {
        _find(wpr, 'maxLength').simulate('change', { target: { value: CHARS.length } });
    });

    beforeEach(() => {
        _find(wpr, 'minLength').simulate('change', { target: { value: 0 } });
    });

    test('Ignore the change if "Min Length" value is greater than "Max length"', () => {

        _find(wpr, 'minLength').simulate('change', { target: { value: 10 } });
        expect(wpr.state().data.minLength).toEqual(0);
    });

    test('Accept the change if "Min Length" value is less than or equal to "Max length"', () => {

        _find(wpr, 'minLength').simulate('change', { target: { value: 2 } });
        expect(wpr.state().data.minLength).toEqual(2);
    });
});

describe('CategorizedValue: On "Max Length" change', () => {

    beforeAll(() => {
        _find(wpr, 'minLength').simulate('change', { target: { value: 2 } });
    });

    beforeEach(() => {
        _find(wpr, 'maxLength').simulate('change', { target: { value: CHARS.length } });
    });

    test('Ignore the change if "Max Length" value is lesser than "Min length"', () => {

        _find(wpr, 'maxLength').simulate('change', { target: { value: 1 } });
        expect(wpr.state().data.maxLength).toEqual(CHARS.length);
    });

    test('Accept the change if "Max Length" value is greater than or equal to "Min length"', () => {

        _find(wpr, 'maxLength').simulate('change', { target: { value: 3 } });
        expect(wpr.state().data.maxLength).toEqual(3);
    });
});