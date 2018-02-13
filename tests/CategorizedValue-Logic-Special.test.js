import { catVal, _find, _props, rndWrapper } from './utils';

const
    escapeSpecial = chars => {
        return chars.split('').map(char => {
            return '\\' + char;
        }).join('');
    },
    SPECIAL_CHARS = '`~!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?',
    SPECIAL = '&&^*&^#',
    SPECIAL_LEN = SPECIAL.length;

describe(`CategorizedValue: If input will be "${SPECIAL}"`, () => {

    let dummyData = catVal('special', SPECIAL),
        wpr = rndWrapper(dummyData);

    beforeEach(() => {
        _find(wpr, 'isConstant').simulate('change', { target: { checked: false } });
        _find(wpr, 'isOptional').simulate('change', { target: { checked: false } });
        _find(wpr, 'canSplit').simulate('change', { target: { checked: false } });
        _find(wpr, 'maxLength').simulate('change', { target: { value: SPECIAL_LEN } });
        _find(wpr, 'customValues').simulate('change', { target: { value: '' } });
    });

    describe('If "Constant" set to false and', () => {

        test(`By default regex should be "[${escapeSpecial(SPECIAL_CHARS)}]{1,${SPECIAL_LEN}}"`, () => {

            expect(wpr.state().data.regEx).toBe(`[${escapeSpecial(SPECIAL_CHARS)}]{1,${SPECIAL_LEN}}`);
        });

        test(`If "Optional" set to true, regex should be "[${escapeSpecial(SPECIAL_CHARS)}]{0,${SPECIAL_LEN}}"`, () => {

            _find(wpr, 'isOptional').simulate('change', { target: { checked: true } });
            expect(wpr.state().data.regEx).toBe(`[${escapeSpecial(SPECIAL_CHARS)}]{0,${SPECIAL_LEN}}`);
        });

        test(`If "Can Split" set to true, regex should be ""`, () => {

            _find(wpr, 'canSplit').simulate('change', { target: { checked: true } });
            expect(wpr.state().data.regEx).toBe('');
        });

        test(`If "Max Length" set to 4 and "Min Length" set to 2, regex should be "[${escapeSpecial(SPECIAL_CHARS)}]{2,4}"`, () => {

            _find(wpr, 'minLength').simulate('change', { target: { value: 2 } });
            _find(wpr, 'maxLength').simulate('change', { target: { value: 4 } });
            expect(wpr.state().data.regEx).toBe(`[${escapeSpecial(SPECIAL_CHARS)}]{2,4}`);
        });

        test(`If "customValues" set to "+>>?.?:{", regex should be "[\\&\\^\\*\\#\\+\\>\\?\\.\\:\\{]{1,${SPECIAL_LEN}}"`, () => {

            _find(wpr, 'customValues').simulate('change', { target: { value: '+>>?.?:{' } });
            expect(wpr.state().data.regEx).toBe(`[\\&\\^\\*\\#\\+\\>\\?\\.\\:\\{]{1,${SPECIAL_LEN}}`);
        });
    });

    describe('If "Constant" set to true and', () => {
        // (&(&(^(*(&(^(#)?)?)?)?)?)?)?
        const result1 = '\\&(\\&(\\^(\\*(\\&(\\^(\\#)?)?)?)?)?)?',
            result2 = '(\\&(\\&(\\^(\\*(\\&(\\^(\\#)?)?)?)?)?)?)?',
            result3 = '\\&\\&\\^\\*(\\&(\\^(\\#)?)?)?';

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

describe(`CategorizedValue: If input will be "${SPECIAL[0]}"`, () => {

    let dummyData = catVal('special', SPECIAL[0]),
        wpr = rndWrapper(dummyData);

    beforeEach(() => {
        _find(wpr, 'isConstant').simulate('change', { target: { checked: false } });
        _find(wpr, 'isOptional').simulate('change', { target: { checked: false } });
    });

    test(`If "Constant" set to false, regex should be "[${escapeSpecial(SPECIAL_CHARS)}]"`, () => {

        expect(wpr.state().data.regEx).toBe(`[${escapeSpecial(SPECIAL_CHARS)}]`);
    })

    test(`If "Constant" set to true, regex should be "${escapeSpecial(SPECIAL[0])}"`, () => {

        _find(wpr, 'isConstant').simulate('change', { target: { checked: true } });
        expect(wpr.state().data.regEx).toBe(`${escapeSpecial(SPECIAL[0])}`);
    });

    test(`If "Optional" set to true, regex should be "[${escapeSpecial(SPECIAL_CHARS)}]?"`, () => {

        _find(wpr, 'isOptional').simulate('change', { target: { checked: true } });
        expect(wpr.state().data.regEx).toBe(`[${escapeSpecial(SPECIAL_CHARS)}]?`);
    });
});