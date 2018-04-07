import { CategorizedValueModel } from '../models/CategorizedValue.model';

const /* SPECIAL_CHARS = '`~!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?', */
    /*
     * @Private
     * 
     * Calculate and parse the string containing Min/Max value 
     * to be set for expression 
     * in {MIN,MAX} Format
     * Empty string will be returned if MIN, MAX both values are unavailable
     * 
     * @params { CategorizedValueModel | Object } data
     * @returns { String } parsed string in {MIN,MAX} or ''
     */
    calcLimit = data => {
        return (data.canSplit || (Number(data.minLength) === 1 && Number(data.maxLength) === 1)) ? '' :
            (Number(data.minLength) === 0 && Number(data.maxLength) === 1 ? '?' : `{${Number(data.minLength) === Number(data.maxLength) ? Number(data.minLength) :
                (`${data.isOptional ? 0 : data.minLength},${data.maxLength}`)}}`);
    },

    /*
     * @Private
     * 
     * Escape the special characters with "\" (back slash)
     * 
     * @params { String } chars
     * @returns { String } escaped string
     */
    escapeSpecial = chars => {
        return chars.split('').map(char => {
            return '\\' + char;
        }).join('');
    },

    /*
     * @Private
     * 
     * Remove the repeated/duplicate characters and
     * filter out the unique charcters from the custom values field
     * 
     * @params { CategorizedValueModel | Object } data
     * @returns { String } unique values
     */
    _unique = data => {
        var uniqueVals = '';
        (data.customValues || '').split('').forEach(char => {
            if (uniqueVals.indexOf(char) === -1) {
                uniqueVals += char;
            }
        });
        return uniqueVals;
    },

    /*
     * @Private
     * 
     * Filter out the unique charcters from the custom values field
     * 
     * @params { String } char
     * @params { Boolean } l - If lowercase allowed
     * @params { Boolean } u - If uppercase allowed
     * @params { Boolean } asList - To be wrapped in "[]" or not
     * @returns { String } string Optionally wrapped in "[]" || Emppty string is given value is not an Alphabet
     */
    _alphas = (char, l, u, asList) => {
        var isAlpha = /[a-zA-Z]/.test(char);
        if (isAlpha && l && u) {
            return `${asList ? '[' : ''}${char.toLowerCase()}${char.toUpperCase()}${asList ? ']' : ''}`;
        }
        else if (isAlpha && l) {
            return char.toLowerCase();
        }
        else if (isAlpha && u) {
            return char.toUpperCase();
        } else {
            return '';
        }
    },

    /*
     * @Private
     * 
     * Validate if the given char is a Number
     * 
     * @params { String } char
     * @returns { String } value as it is if is a Number || Emppty string is given value is not a Number
     */
    _digits = (char) => {
        if (/\d/.test(char)) {
            return char;
        } else {
            return '';
        }
    },

    /*
     * @Private
     * 
     * Validate if the given char is a Special Character (Other than Alphanumeric and space values)
     * 
     * @params { String } char
     * @returns { String } value as it is if is a Special Character || Emppty string is given value is not a Special Character
     */
    _spclChars = (char) => {
        if (/[^\d\sa-zA-Z]/.test(char)) {
            return escapeSpecial(char);
        } else {
            return '';
        }
    };

/*
 * @Public
 * 
 * Create the RegEx String for given value object
 * 
 * @params { CategorizedValueModel | Object } data
 * @returns { CategorizedValueModel | Object } object with updated RegEx
 */
export function updateRegEx(data) {
    const _L = data.canLower,   // Lowercase allowed
        _U = data.canUpper,     // Upper allowed
        _D = data.canDigit,     // Numbers allowed
        _SC = data.canSpecial,  // Special characters allowed
        _SP = data.canSpace,    // Space allowed
        _xcld = data.exclude;   // Exclude the custom values or not?

    var strRegEx = '';

    // If value to be used as it is
    if (data.isConstant) {
        let _rx = '',
            splitted = data.chars.split(''),
            len = splitted.length, i = len - 1;

        /*
         * Prepare the RegEx string in
         * (a(b(c)?)?)? Format
         */
        for (; i >= 0; i--) {
            let range = i >= data.minLength && i < data.maxLength + 1,
                char = splitted[i];
            _rx = `${range ? '(' : ''}${_alphas(char, _L, _U, true)}${_digits(char)}${_spclChars(char)}${_rx}${range ? ')?' : ''}`;
        }
        strRegEx += _rx;
    }
    /*
     * If value is not a Contant (NOT to be used as it is)
     */
    // If it is not further split
    else if (!data.canSplit) {
        // If Custom Values are provided
        if (data.customValues) {
            // If the custom values are NOT list of Selected words
            if (data.customValType !== 'list') {
                strRegEx += '[';

                // Make the values to be Exlcuded, If true
                _xcld && (strRegEx += '^');

                // Extract the unique values and merge in the RegEx string
                _unique(data).split('').forEach(char => {
                    strRegEx += `${_alphas(char, _L, _U, false)}${_digits(char)}${_spclChars(char)}`;
                });
                strRegEx += ']';
            } // Prepare the RegEx string for "Selected words provided"
            else {
                strRegEx += '(';
                strRegEx += data.customValues.split(',').join('|');
                strRegEx += ')';
            }
        } // If the Custom Values are not available
        else {
            // If Special Characters are NOT allowed
            if (!_SC) {
                // Only Space
                if (_SP && !_D && !_L && !_U) {
                    strRegEx += '\\s';
                }
                // Only Digits
                else if (!_SP && _D && !_L && !_U) {
                    strRegEx += '\\d';
                } else {
                    strRegEx += '[';
                    _SP && (strRegEx += '\\s');     // Include Special characters if allowed
                    _D && (strRegEx += '\\d');      // Include Numbers if allowed 
                    _L && (strRegEx += 'a-z');      // Include Lower alphabets if allowed 
                    _U && (strRegEx += 'A-Z');      // Include Upper alphabets if allowed 
                    strRegEx += ']';
                }
            } // If Special Characters are allowed
            else {                                         // _SP  _D  _L  _U
                if (!_SP && !_D && !_L && !_U) {           //  0    0   0   0
                    strRegEx += '[^\\s\\da-zA-Z]';
                } else if (!_SP && !_D && !_L && _U) {     //  0    0   0   1
                    strRegEx += '[^\\s\\da-z]';
                } else if (!_SP && !_D && _L && !_U) {     //  0    0   1   0
                    strRegEx += '[^\\s\\dA-Z]';
                } else if (!_SP && !_D && _L && _U) {      //  0    0   1   1
                    strRegEx += '[^\\s\\d]';
                } else if (!_SP && _D && !_L && !_U) {     //  0    1   0   0
                    strRegEx += '[^\\sa-zA-Z]';
                } else if (!_SP && _D && !_L && _U) {      //  0    1   0   1
                    strRegEx += '[^\\sa-z]';
                } else if (!_SP && _D && _L && !_U) {      //  0    1   1   0
                    strRegEx += '[^\\sA-Z]';
                } else if (!_SP && _D && _L && _U) {       //  0    1   1   1
                    strRegEx += '[^\\s]';
                } else if (_SP && !_D && !_L && !_U) {     //  1    0   0   0
                    strRegEx += '[^\\da-zA-Z]';
                } else if (_SP && !_D && !_L && _U) {      //  1    0   0   1
                    strRegEx += '[^\\da-z]';
                } else if (_SP && !_D && _L && !_U) {      //  1    0   1   0
                    strRegEx += '[^\\dA-Z]';
                } else if (_SP && !_D && _L && _U) {       //  1    0   1   1
                    strRegEx += '[^\\d]';
                } else if (_SP && _D && !_L && !_U) {      //  1    1   0   0
                    strRegEx += '[^a-zA-Z]';
                } else if (_SP && _D && !_L && _U) {       //  1    1   0   1
                    strRegEx += '[^a-z]';
                } else if (_SP && _D && _L && !_U) {       //  1    1   1   0
                    strRegEx += '[^A-Z]';
                } else if (_SP && _D && _L && _U) {        //  1    1   1   1
                    strRegEx += '.';
                }
            }
        }
        // Append the Min, Max length to the generated RegEx String
        strRegEx += calcLimit(data);
    }
    data.regEx = strRegEx;
    return data;
};

/*
 * @Public
 * 
 * Split the given Sample value based on 
 * Upeprcase, Lowercase, Number or Special characters
 * 
 * @params { String } val
 * @params { String } type
 * @returns { Array < CategorizedValueModel > } list of Categorized Values
 */
export function splitValue(val, type) {
    console.log('splitValue(val, type)', val, type);
    // If value is of same type (Lowercase, Uppercase, Number, Special characters)
    if (type && type !== 'mixed') {
        /*
         * Split the value to 1 character each
         * and return Array of Categorized values
         */
        return val.split('').map((val, valI) => {
            return new CategorizedValueModel({ type: type, chars: val });
        });
    }
    
    var lastItem, catVals = [],
        /*
         * @Private 
         * 
         * Split the value based on 
         * (Uppercase, Lowercase, numbers and special characters)
         * 
         * @params { String } char
         * @params { String } type
         * @return { undefined } undefined
         */
        _fn = (char, type) => {
            // If the character is of same type as of previous, update if
            if (lastItem && lastItem.type === type) {
                lastItem.chars += char;
                lastItem.maxLength = lastItem.chars.length;
            } // If the character is of diffrent type, create a new instance
            else {
                catVals.push(lastItem = new CategorizedValueModel({ type: type, chars: char }));
            }
        };

    /*
     * Split the value based on charcter type
     * and store the Array of Categorized values in "catVals"
     */
    val.split('').forEach((char, i) => {
        lastItem = catVals[catVals.length - 1];

        if (/[a-z]/.test(char)) {
            _fn(char, 'lowerAlpha');
        } else if (/[A-Z]/.test(char)) {
            _fn(char, 'upperAlpha');
        } else if (/\d/.test(char)) {
            _fn(char, 'digit');
        } else if (/\s/.test(char)) {
            _fn(char, 'space');
        } else if (/[^a-z\d\s]/i.test(char)) {
            _fn(char, 'special');
        }
    }, this);
    return catVals;
};