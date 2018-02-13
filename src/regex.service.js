const
    SPECIAL_CHARS = '`~!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?',
    calcLimit = data => {
        return (data.canSplit || (data.minLength == 1 && data.maxLength == 1)) ? '' :
            (data.minLength == 0 && data.maxLength == 1 ? '?' : `{${data.minLength == data.maxLength ? data.minLength :
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
    const _sensitive = data.isSensitive,
        _type = data.type,
        _isAlpha = isAlpha(_type),
        _optional = data.isOptional;

    var strRegEx = '';

    if (data.isConstant) {
        let _rx = '',
            splitted = data.chars.split(''),
            len = splitted.length, i = len - 1;

        for (; i >= 0; i--) {
            let range = i >= data.minLength && i < data.maxLength + 1,
                char = splitted[i];
            _rx = `${range ? '(' : ''}${_sensitive || !_isAlpha ? (_type === 'special' ? escapeSpecial(char) : char) : `[${char.toLowerCase()}${char.toUpperCase()}]`}${_rx}${range ? ')?' : ''}`;
        }
        strRegEx += /* _optional ? `(${_rx})?` : */ _rx;
    } else if (!data.canSplit) {
        if (_type === 'digit') {
            strRegEx += data.customValues ? `[${parseCustomValues(data)}]` : '\\d';
        } else if (_type === 'special') {
            strRegEx += data.customValues ? `[${escapeSpecial(parseCustomValues(data))}]` : `[${escapeSpecial(SPECIAL_CHARS)}]`;
        } else {
            strRegEx += '[';
            if (data.customValues) {
                let custVals = parseCustomValues(data);
                // strRegEx += custVals.toLowerCase() + custVals.toUpperCase();
                strRegEx += _sensitive ? custVals : custVals.toLowerCase() + custVals.toUpperCase();
            } else if (_isAlpha) {
                if (!_sensitive) {
                    strRegEx += 'a-zA-Z';
                } else if (data.type === 'lowerAlpha') {
                    strRegEx += 'a-z';
                } else {
                    strRegEx += 'A-Z';
                }
            } else {
                let alphas = parseCustomValues(data);
                strRegEx += _sensitive ? alphas : alphas.toLowerCase() + alphas.toUpperCase();
            }
            strRegEx += ']';
        }
        strRegEx += calcLimit(data);
    }
    data.regEx = strRegEx;
    return data;
};