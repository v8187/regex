import { catVal, _find, _props, rndWrapper } from './utils';

const
    DIGITS = '2296884',
    DIGITS_LEN = DIGITS.length;

describe(`CategorizedValue: If input will be "${DIGITS}"`, () => {

    let dummyData = catVal('digit', DIGITS),
        wpr = rndWrapper(dummyData);

    beforeEach(() => {
        _find(wpr, 'isConstant').simulate('change', { target: { checked: false } });
        _find(wpr, 'isOptional').simulate('change', { target: { checked: false } });
        _find(wpr, 'canSplit').simulate('change', { target: { checked: false } });
        _find(wpr, 'maxLength').simulate('change', { target: { value: DIGITS_LEN } });
        _find(wpr, 'customValues').simulate('change', { target: { value: '' } });
    });

    describe('If "Constant" set to false and', () => {

        test(`By default regex should be "\\d{1,${DIGITS_LEN}}"`, () => {

            expect(wpr.state().data.regEx).toBe(`\\d{1,${DIGITS_LEN}}`);
        });

        test(`If "Optional" set to true, regex should be "\\d{0,${DIGITS_LEN}}"`, () => {

            _find(wpr, 'isOptional').simulate('change', { target: { checked: true } });
            expect(wpr.state().data.regEx).toBe(`\\d{0,${DIGITS_LEN}}`);
        });

        test(`If "Can Split" set to true, regex should be ""`, () => {

            _find(wpr, 'canSplit').simulate('change', { target: { checked: true } });
            expect(wpr.state().data.regEx).toBe('');
        });

        test(`If "Max Length" set to 4 and "Min Length" set to 2, regex should be "\\d{2,4}"`, () => {

            _find(wpr, 'minLength').simulate('change', { target: { value: 2 } });
            _find(wpr, 'maxLength').simulate('change', { target: { value: 4 } });
            expect(wpr.state().data.regEx).toBe('\\d{2,4}');
        });

        test(`If "customValues" set to "7745556666", regex should be "[2968475]{1,7}"`, () => {

            _find(wpr, 'customValues').simulate('change', { target: { value: '7745556666' } });
            expect(wpr.state().data.regEx).toBe('[2968475]{1,7}');
        });
    });

    describe('If "Constant" set to true and', () => {
        const result1 = '2(2(9(6(8(8(4)?)?)?)?)?)?',
            result2 = '(2(2(9(6(8(8(4)?)?)?)?)?)?)?',
            result3 = '2296(8(8(4)?)?)?';

        beforeEach(() => {
            _find(wpr, 'isConstant').simulate('change', { target: { checked: true } });
            _find(wpr, 'isOptional').simulate('change', { target: { checked: false } });
        });

        test(`regex should be "${result1}"`, () => {

            expect(wpr.state().data.regEx).toBe(result1);
        });

        test(`and "Optional" set to true, regex should be "${result2}"`, () => {

            _find(wpr, 'isOptional').simulate('change', { target: { checked: true } });
            expect(wpr.state().data.regEx).toBe(result2);
        });

        test(`and "Min Length" set to 4, regex should be "${result3}"`, () => {

            _find(wpr, 'minLength').simulate('change', { target: { value: 4 } });
            expect(wpr.state().data.regEx).toBe(result3);
        });
    });
});

describe(`CategorizedValue: If input will be "${DIGITS[0]}"`, () => {

    let dummyData = catVal('digit', DIGITS[0]),
        wpr = rndWrapper(dummyData);

    beforeEach(() => {
        _find(wpr, 'isConstant').simulate('change', { target: { checked: false } });
        _find(wpr, 'isOptional').simulate('change', { target: { checked: false } });
    });

    test(`If "Constant" set to false, regex should be "\\d"`, () => {

        expect(wpr.state().data.regEx).toBe('\\d');
    })

    test(`If "Constant" set to true, regex should be "${DIGITS[0]}"`, () => {

        _find(wpr, 'isConstant').simulate('change', { target: { checked: true } });
        expect(wpr.state().data.regEx).toBe(`${DIGITS[0]}`);
    });

    test(`If "Optional" set to true, regex should be "\\d?"`, () => {

        _find(wpr, 'isOptional').simulate('change', { target: { checked: true } });
        expect(wpr.state().data.regEx).toBe('\\d?');
    });
});