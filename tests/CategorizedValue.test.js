import React from 'react';
import { shallow } from 'enzyme';

import { CategorizedValue } from '../src/CategorizedValue';
import { CategorizedValueClass } from '../src/CategorizedValue.class';

const
    rndWrapper = (dumData) => {
        return shallow(<CategorizedValue data={dumData} onChange={data => { }} />);
    },
    catVal = (type, chars) => {
        return new CategorizedValueClass(type, chars);
    },
    _find = (wrapper, ref) => {
        return wrapper.find(`[data-ctrl="${ref}"]`);
    },
    _props = (wrapper, ref) => {
        return _find(wrapper, ref).props();
    };

describe('CategorizedValue: If "Is Constant" is checked', () => {
    const CHARS = 'fsde',
        SPLITTED_CHARS = CHARS.split('').map(char => {
            return catVal('lowerAlpha', char);
        });
    let dummyData, wpr;

    beforeAll(() => {
        dummyData = catVal('lowerAlpha', CHARS);
        wpr = rndWrapper(dummyData);
    });

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

    test('enables the "Min" length controls', () => {
        _find(wpr, 'canSplit').simulate('change', { target: { checked: true } });
        expect(_props(wpr, 'minLength').disabled).toBeTruthy();
        _find(wpr, 'isConstant').simulate('change', { target: { checked: true } });
        expect(_props(wpr, 'minLength').disabled).toBeFalsy();
    });

    test('"Max length"  should be equal "Chars" length', () => {

        _find(wpr, 'maxLength').simulate('change', { target: { value: CHARS.length + 10 } });
        expect(wpr.state().data.maxLength).toBe(CHARS.length + 10);
        _find(wpr, 'isConstant').simulate('change', { target: { checked: true } });
        expect(wpr.state().data.maxLength).toBe(CHARS.length);
    });
});

describe('CategorizedValue: If "Is Constant" is unchecked', () => {
    const CHARS = 'fsde';
    let dummyData, wpr;

    beforeAll(() => {
        dummyData = catVal('lowerAlpha', CHARS);
        wpr = rndWrapper(dummyData);
    });

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
    const CHARS = 'fsde',
        SPLITTED_CHARS = CHARS.split('').map(char => {
            return catVal('lowerAlpha', char);
        });
    let dummyData, wpr;

    beforeAll(() => {
        dummyData = catVal('lowerAlpha', CHARS);
        wpr = rndWrapper(dummyData);
    });

    beforeEach(() => {
        _find(wpr, 'canSplit').simulate('change', { target: { checked: false } });
    });

    test('hides the "Alternate Values" control', () => {

        expect(_find(wpr, 'alternateValues').length).toBe(1);
        _find(wpr, 'canSplit').simulate('change', { target: { checked: true } });
        expect(_find(wpr, 'alternateValues').length).toBe(0);
    });

    test('disables the "Min" and "Max" length controls', () => {

        expect(_props(wpr, 'minLength').disabled).toBeFalsy();
        expect(_props(wpr, 'maxLength').disabled).toBeFalsy();
        _find(wpr, 'canSplit').simulate('change', { target: { checked: true } });
        expect(_props(wpr, 'minLength').disabled).toBeTruthy();
        expect(_props(wpr, 'maxLength').disabled).toBeTruthy();
    });

    test('shows the "Splitted" controls', () => {

        expect(wpr.state().data.splitted).toBeNull();
        _find(wpr, 'canSplit').simulate('change', { target: { checked: true } });
        expect(wpr.state().data.splitted).toEqual(SPLITTED_CHARS);
    });
});

describe('CategorizedValue: If "Can Split" is unchecked', () => {
    const CHARS = 'fsde',
        SPLITTED_CHARS = CHARS.split('').map(char => {
            return catVal('lowerAlpha', char);
        });
    let dummyData, wpr;

    beforeAll(() => {
        dummyData = catVal('lowerAlpha', CHARS);
        wpr = rndWrapper(dummyData);
    });

    beforeEach(() => {
        _find(wpr, 'canSplit').simulate('change', { target: { checked: true } });
    });

    test('shows the "Alternate Values" control', () => {

        expect(_find(wpr, 'alternateValues').length).toBe(0);
        _find(wpr, 'canSplit').simulate('change', { target: { checked: false } });
        expect(_find(wpr, 'alternateValues').length).toBe(1);
    });

    test('enables the "Min" and "Max" length controls', () => {

        expect(_props(wpr, 'minLength').disabled).toBeTruthy();
        expect(_props(wpr, 'maxLength').disabled).toBeTruthy();
        _find(wpr, 'canSplit').simulate('change', { target: { checked: false } });
        expect(_props(wpr, 'minLength').disabled).toBeFalsy();
        expect(_props(wpr, 'maxLength').disabled).toBeFalsy();
    });

    test('hides the "Splitted" controls', () => {

        expect(wpr.state().data.splitted).toEqual(SPLITTED_CHARS);
        _find(wpr, 'canSplit').simulate('change', { target: { checked: false } });
        expect(wpr.state().data.splitted).toBeNull();
    });
});

describe('CategorizedValue: If "Optional" is checked', () => {
    const CHARS = 'fsde';
    let dummyData, wpr;

    beforeAll(() => {
        dummyData = catVal('lowerAlpha', CHARS);
        wpr = rndWrapper(dummyData);
    });

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
    const CHARS = 'fsde';
    let dummyData, wpr;

    beforeAll(() => {
        dummyData = catVal('lowerAlpha', CHARS);
        wpr = rndWrapper(dummyData);
    });

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
    const CHARS = 'fsde';
    let dummyData, wpr;

    beforeAll(() => {
        dummyData = catVal('lowerAlpha', CHARS);
        wpr = rndWrapper(dummyData);
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
    const CHARS = 'fsde';
    let dummyData, wpr;

    beforeAll(() => {
        dummyData = catVal('lowerAlpha', CHARS);
        wpr = rndWrapper(dummyData);
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