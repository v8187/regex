import { CategorizedValueClass } from './CategorizedValue.class';

const
    SPECIAL_CHARS = '`~!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?',
    calcLimit = data => {
        return (data.canSplit || (Number(data.minLength) === 1 && Number(data.maxLength) === 1)) ? '' :
            (Number(data.minLength) === 0 && Number(data.maxLength) === 1 ? '?' : `{${Number(data.minLength) === Number(data.maxLength) ? Number(data.minLength) :
                (`${data.isOptional ? 0 :
                    data.minLength},${data.maxLength}`)}}`);
    },
    isAlpha = type => {
        return ['lowerAlpha', 'upperAlpha'].indexOf(type) !== -1;
    },
    parseCustomValues = data => {
        var uniqueVals = '';
        if (/^([a-z]-[a-z])|(\d-\d)|([A-Z]-[A-Z])$/.test(data.customValues)) {
            uniqueVals = data.customValues;
        } else {
            (data.chars + data.customValues || '').split('').forEach(char => {
                if (uniqueVals.indexOf(char) === -1) {
                    uniqueVals += char;
                }
            });
        }
        return uniqueVals;
    },
    escapeSpecial = chars => {
        return chars.split('').map(char => {
            return '\\' + char;
        }).join('');
    },
    _unique = data => {
        var uniqueVals = '';
        (data.customValues || '').split('').forEach(char => {
            if (uniqueVals.indexOf(char) === -1) {
                uniqueVals += char;
            }
        });
        return uniqueVals;
    },
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
    _digits = (char) => {
        if (/\d/.test(char)) {
            return char;
        } else {
            return '';
        }
    },
    _spclChars = (char) => {
        if (/[^\d\sa-zA-Z]/.test(char)) {
            return escapeSpecial(char);
        } else {
            return '';
        }
    };

export function updateRegEx(data) {
    const _L = data.canLower,
        _U = data.canUpper,
        _D = data.canDigit,
        _SC = data.canSpecial,
        _SP = data.canSpace,
        _type = data.type,
        _isAlpha = isAlpha(_type)/* ,
 _optional = data.isOptional */;

    var strRegEx = '';

    if (data.isConstant) {
        let _rx = '',
            splitted = data.chars.split(''),
            len = splitted.length, i = len - 1;

        for (; i >= 0; i--) {
            let range = i >= data.minLength && i < data.maxLength + 1,
                char = splitted[i];
            // _rx = `${range ? '(' : ''}${_L || !_isAlpha ? (_type === 'special' ? escapeSpecial(char) : char) : `[${char.toLowerCase()}${char.toUpperCase()}]`}${_rx}${range ? ')?' : ''}`;
            _rx = `${range ? '(' : ''}${_alphas(char, _L, _U, true)}${_digits(char)}${_spclChars(char)}${_rx}${range ? ')?' : ''}`;
        }
        strRegEx += /* _optional ? `(${_rx})?` : */ _rx;
    } else if (!data.canSplit) {
        if (data.customValues) {
            switch (data.customValType) {
                case 'any':
                default:
                    strRegEx += '[';
                    _unique(data).split('').forEach(char => {
                        strRegEx += `${_alphas(char, _L, _U, false)}${_digits(char)}${_spclChars(char)}`;
                    });
                    strRegEx += ']';
                    break;
                case 'list':
                    break;
                case 'range':
                    break;
            }
        } else {
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
                    _SP && (strRegEx += '\\s');
                    _D && (strRegEx += '\\d');
                    _L && (strRegEx += 'a-z');
                    _U && (strRegEx += 'A-Z');
                    strRegEx += ']';
                }
            } else {                                        // S    D   L   U
                if (!_SP && !_D && !_L && !_U) {            // 0    0   0   0
                    strRegEx += '[^\\s\\da-zA-Z]';
                } else if (!_SP && !_D && !_L && _U) {      // 0    0   0   1
                    strRegEx += '[^\\s\\da-z]';
                } else if (!_SP && !_D && _L && !_U) {      // 0    0   1   0
                    strRegEx += '[^\\s\\dA-Z]';
                } else if (!_SP && !_D && _L && _U) {       // 0    0   1   1
                    strRegEx += '[^\\s\\d]';
                } else if (!_SP && _D && !_L && !_U) {      // 0    1   0   0
                    strRegEx += '[^\\sa-zA-Z]';
                } else if (!_SP && _D && !_L && _U) {       // 0    1   0   1
                    strRegEx += '[^\\sa-z]';
                } else if (!_SP && _D && _L && !_U) {       // 0    1   1   0
                    strRegEx += '[^\\sA-Z]';
                } else if (!_SP && _D && _L && _U) {        // 0    1   1   1
                    strRegEx += '[^\\s]';
                } else if (_SP && !_D && !_L && !_U) {      // 1    0   0   0
                    strRegEx += '[^\\da-zA-Z]';
                } else if (_SP && !_D && !_L && _U) {       // 1    0   0   1
                    strRegEx += '[^\\da-z]';
                } else if (_SP && !_D && _L && !_U) {       // 1    0   1   0
                    strRegEx += '[^\\dA-Z]';
                } else if (_SP && !_D && _L && _U) {        // 1    0   1   1
                    strRegEx += '[^\\d]';
                } else if (_SP && _D && !_L && !_U) {       // 1    1   0   0
                    strRegEx += '[^a-zA-Z]';
                } else if (_SP && _D && !_L && _U) {        // 1    1   0   1
                    strRegEx += '[^a-z]';
                } else if (_SP && _D && _L && !_U) {        // 1    1   1   0
                    strRegEx += '[^A-Z]';
                } else if (_SP && _D && _L && _U) {         // 1    1   1   1
                    strRegEx += '.';
                }
            }
        }
        // if (_type === 'digit') {
        // strRegEx += data.customValues ? `[${parseCustomValues(data)}]` : '\\d';
        // } else if (_type === 'special') {
        // strRegEx += data.customValues ? `[${escapeSpecial(parseCustomValues(data))}]` : `[^a-zA-Z\\d\\s]`;
        // } else {
        // strRegEx += '[';
        // if (data.customValues) {
        // let custVals = parseCustomValues(data);
        // // strRegEx += custVals.toLowerCase() + custVals.toUpperCase();
        // // strRegEx += _L ? custVals : custVals.toLowerCase() + custVals.toUpperCase();
        // if (_U) {
        // strRegEx += custVals.toUpperCase();
        // }
        // if (_L) {
        // strRegEx += custVals.toLowerCase();
        // }
        // } else if (_isAlpha) {
        // if (_L) {
        // strRegEx += 'a-z';
        // }
        // if (_U) {
        // strRegEx += 'A-Z';
        // }
        // } else {
        // let alphas = parseCustomValues(data);
        // strRegEx += _L ? alphas : alphas.toLowerCase() + alphas.toUpperCase();
        // }
        // strRegEx += ']';
        // }
        strRegEx += calcLimit(data);
    }
    data.regEx = strRegEx;
    return data;
};

export function splitValue(val, type) {
    if (type && type !== 'mixed') {
        return val.split('').map((val, valI) => {
            return new CategorizedValueClass(type, val);
        });
    }
    var lastItem, catVals = [],
        _fn = (char, type) => {
            if (lastItem && lastItem.type === type) {
                lastItem.chars += char;
                lastItem.maxLength = lastItem.chars.length;
            } else {
                catVals.push(lastItem = new CategorizedValueClass(type, char));
            }
        };

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