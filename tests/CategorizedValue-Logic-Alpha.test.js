import { catVal, _find, _props, rndWrapper } from './utils';
const
    CHARS = 'assdfg',
    CHARS_LEN = CHARS.length;

let dummyData = catVal('lowerAlpha', CHARS),
    wpr = rndWrapper(dummyData);

describe(`CategorizedValue: If input will be "${CHARS}"`, () => {

    beforeEach(() => {
        _find(wpr, 'isConstant').simulate('change', { target: { checked: false } });
        _find(wpr, 'canLower').simulate('change', { target: { checked: false } });
        _find(wpr, 'isOptional').simulate('change', { target: { checked: false } });
        _find(wpr, 'canSplit').simulate('change', { target: { checked: false } });
        _find(wpr, 'maxLength').simulate('change', { target: { value: CHARS_LEN } });
        _find(wpr, 'customValues').simulate('change', { target: { value: '' } });
    });

    describe('If "Constant" set to false and', () => {

        test(`By default regex should be "[a-zA-Z]{1,${CHARS_LEN}}"`, () => {

            expect(wpr.state().data.regEx).toBe(`[a-zA-Z]{1,${CHARS_LEN}}`);
        });

        test(`If "Optional" set to true, regex should be "[a-zA-Z]{0,${CHARS_LEN}}"`, () => {

            _find(wpr, 'isOptional').simulate('change', { target: { checked: true } });
            expect(wpr.state().data.regEx).toBe(`[a-zA-Z]{0,${CHARS_LEN}}`);
        });

        test(`If "Can Split" set to true, regex should be ""`, () => {

            _find(wpr, 'canSplit').simulate('change', { target: { checked: true } });
            expect(wpr.state().data.regEx).toBe('');
        });

        test(`If "Case Sensitive" set to true, regex should be "[a-z]{1,${CHARS_LEN}}"`, () => {

            _find(wpr, 'canLower').simulate('change', { target: { checked: true } });
            expect(wpr.state().data.regEx).toBe(`[a-z]{1,${CHARS_LEN}}`);
        });

        test(`If "Max Length" set to 4 and "Min Length" set to 2, regex should be "[a-zA-Z]{2,4}"`, () => {

            _find(wpr, 'minLength').simulate('change', { target: { value: 2 } });
            _find(wpr, 'maxLength').simulate('change', { target: { value: 4 } });
            expect(wpr.state().data.regEx).toBe('[a-zA-Z]{2,4}');
        });

        test(`If "customValues" set to "aaajjjlknmb", regex should be "[asdfgjlknmbASDFGJLKNMB]{1,6}"`, () => {

            _find(wpr, 'customValues').simulate('change', { target: { value: 'aaajjjlknmb' } });
            expect(wpr.state().data.regEx).toBe('[asdfgjlknmbASDFGJLKNMB]{1,6}');
        });

        test(`If "customValues" set to "aaajjjlknmb" and "Case Sensitive" set to true, regex should be "[asdfgjlknmb]{1,6}"`, () => {

            _find(wpr, 'customValues').simulate('change', { target: { value: 'aaajjjlknmb' } });
            _find(wpr, 'canLower').simulate('change', { target: { checked: true } });
            expect(wpr.state().data.regEx).toBe('[asdfgjlknmb]{1,6}');
        });
    });

    describe('If "Constant" set to true and', () => {
        const result1 = '[aA]([sS]([sS]([dD]([fF]([gG])?)?)?)?)?',
            result2 = '([aA]([sS]([sS]([dD]([fF]([gG])?)?)?)?)?)?',
            result3 = 'a(s(s(d(f(g)?)?)?)?)?',
            result4 = '(a(s(s(d(f(g)?)?)?)?)?)?',
            result5 = 'assd(f(g)?)?';

        beforeEach(() => {
            _find(wpr, 'isConstant').simulate('change', { target: { checked: true } });
            _find(wpr, 'isOptional').simulate('change', { target: { checked: false } });
        });

        describe('If "Case Sensitive" set to false', () => {
            test(`regex should be "${result1}"`, () => {

                expect(wpr.state().data.regEx).toBe(result1);
            });

            test(`and "Optional" set to true, regex should be "${result2}"`, () => {

                _find(wpr, 'isOptional').simulate('change', { target: { checked: true } });
                expect(wpr.state().data.regEx).toBe(result2);
            });
        });

        describe('If "Case Sensitive" set to true', () => {

            beforeEach(() => {
                _find(wpr, 'canLower').simulate('change', { target: { checked: true } });
            });

            test(`regex should be "${result3}"`, () => {

                expect(wpr.state().data.regEx).toBe(result3);
            });

            test(`and "Optional" set to true, regex should be "${result4}"`, () => {

                _find(wpr, 'isOptional').simulate('change', { target: { checked: true } });
                expect(wpr.state().data.regEx).toBe(result4);
            });

            test(`and "Min Length" set to 4, regex should be "${result5}"`, () => {

                _find(wpr, 'minLength').simulate('change', { target: { value: 4 } });
                expect(wpr.state().data.regEx).toBe(result5);
            });
        });
    });
});