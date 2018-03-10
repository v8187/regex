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
    };


export function updateRegEx(data) {
    const _canLower = data.canLower,
        _canUpper = data.canUpper,
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
            _rx = `${range ? '(' : ''}${_canLower || !_isAlpha ? (_type === 'special' ? escapeSpecial(char) : char) : `[${char.toLowerCase()}${char.toUpperCase()}]`}${_rx}${range ? ')?' : ''}`;
        }
        strRegEx += /* _optional ? `(${_rx})?` : */ _rx;
    } else if (!data.canSplit) {
        if (_type === 'digit') {
            strRegEx += data.customValues ? `[${parseCustomValues(data)}]` : '\\d';
        } else if (_type === 'special') {
            strRegEx += data.customValues ? `[${escapeSpecial(parseCustomValues(data))}]` : `[^a-zA-Z\\d\\s]`;
        } else {
            strRegEx += '[';
            if (data.customValues) {
                let custVals = parseCustomValues(data);
                // strRegEx += custVals.toLowerCase() + custVals.toUpperCase();
                // strRegEx += _canLower ? custVals : custVals.toLowerCase() + custVals.toUpperCase();
                if (_canUpper) {
                    strRegEx += custVals.toUpperCase();
                }
                if (_canLower) {
                    strRegEx += custVals.toLowerCase();
                }
            } else if (_isAlpha) {
                if (_canLower) {
                    strRegEx += 'a-z';
                }
                if (_canUpper) {
                    strRegEx += 'A-Z';
                }
            } else {
                let alphas = parseCustomValues(data);
                strRegEx += _canLower ? alphas : alphas.toLowerCase() + alphas.toUpperCase();
            }
            strRegEx += ']';
        }
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