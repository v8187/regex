import React, { Component } from 'react';

import { CategorizedValueClass } from './CategorizedValue.class';

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
    parseAlternateValues = data => {
        var uniqueVals = '';
        if (/^([a-z]-[a-z])|(\d-\d)|([A-Z]-[A-Z])$/.test(data.alternateValues)) {
            uniqueVals = data.alternateValues;
        } else {
            (data.chars + data.alternateValues || '').split('').forEach(char => {
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

export class CategorizedValueSettings extends Component {

    constructor(props) {

        super(props);

        this.updateCateValsState = this.updateState.bind(this);
        this.handleConstant = this.handleConstant.bind(this);
        this.handleSplit = this.handleSplit.bind(this);
        this.handleSensitive = this.handleSensitive.bind(this);
        this.handleOptional = this.handleOptional.bind(this);
        this.handleMinValue = this.handleMinValue.bind(this);
        this.handleMaxValue = this.handleMaxValue.bind(this);
        this.handleCustomList = this.handleAlternateValues.bind(this);
        this.updateRegEx = this.updateRegEx.bind(this);

        this.state = {
            data: this.updateRegEx(this.props.data)
        };
    }

    componentDidMount() { }

    componeneWillUnMount() { }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: this.updateRegEx(nextProps.data)
        });
    }

    updateRegEx(data) {
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
                strRegEx += data.alternateValues ? `[${parseAlternateValues(data)}]` : '\\d';
            } else if (_type === 'special') {
                strRegEx += data.alternateValues ? `[${escapeSpecial(parseAlternateValues(data))}]` : `[${escapeSpecial(SPECIAL_CHARS)}]`;
            } else {
                strRegEx += '[';
                if (data.alternateValues) {
                    let alterVals = parseAlternateValues(data);
                    // strRegEx += alterVals.toLowerCase() + alterVals.toUpperCase();
                    strRegEx += _sensitive ? alterVals : alterVals.toLowerCase() + alterVals.toUpperCase();
                } else if (_isAlpha) {
                    if (!_sensitive) {
                        strRegEx += 'a-zA-Z';
                    } else if (data.type === 'lowerAlpha') {
                        strRegEx += 'a-z';
                    } else {
                        strRegEx += 'A-Z';
                    }
                } else {
                    let alphas = parseAlternateValues(data);
                    strRegEx += _sensitive ? alphas : alphas.toLowerCase() + alphas.toUpperCase();
                }
                strRegEx += ']';
            }
            strRegEx += calcLimit(data);
        }
        data.regEx = strRegEx;
        return data;
    }

    updateState(prop, val) {
        var { data } = this.state;

        switch (prop) {
            case 'isOptional':
                data.minLength = val ? 0 : 1;
                data.isOptional = val;
                break;
            case 'minLength':
                data.minLength = val > data.maxLength && val !== '' ? data.minLength : val;
                break;
            case 'maxLength':
                data.maxLength = val < data.minLength && val !== '' ? data.maxLength : val;
                break;
            case 'canSplit':
            case 'isConstant':
                data[prop] = val;
                if (data.isConstant) {
                    data.canSplit = false;
                    data.maxLength = data.chars.length;
                }
                (data.canSplit || data.isConstant) && (data.alternateValues = '');
                data.splitted = data.canSplit && !data.isConstant ? data.chars.split('').map((val, valI) => {
                    return new CategorizedValueClass(data.type, val);
                }) : null;
                break;
            default:
                data[prop] = val;
                break;
        }

        data = this.updateRegEx(data);
        this.setState({ data: data }, () => {
            this.props.onChange(this.state.data);
        });
    }

    handleConstant(evt) {
        this.updateState('isConstant', evt.target.checked);
    }

    handleSplit(evt) {
        this.updateState('canSplit', evt.target.checked);
    }

    handleSensitive(evt) {
        this.updateState('isSensitive', evt.target.checked);
    }

    handleOptional(evt) {
        this.updateState('isOptional', evt.target.checked);
    }

    handleMinValue(evt) {
        this.updateState('minLength', evt.target.value);
    }

    handleMaxValue(evt) {
        this.updateState('maxLength', evt.target.value);
    }

    handleAlternateValues(evt) {
        this.updateState('alternateValues', evt.target.value);
    }

    render() {
        let { data } = this.state;

        return (<div className="cate_val_wrapper">
            <p>{`${data.chars}`}</p>
            {data.type !== 'space' &&
                <label className={`rx_btn_icon ${data.isConstant ? 'rx_checked' : ''}`}>
                    <input type="checkbox" data-ctrl="isConstant"
                        checked={data.isConstant}
                        onChange={(event) => this.handleConstant(event)} />
                    <i className="fa fa-minus-square" />
                </label>}
            {data.type !== 'space' && data.chars.length > 1 && !data.isConstant &&
                <label className={`rx_btn_icon ${data.canSplit ? 'rx_checked' : ''}`}>
                    <input type="checkbox" data-ctrl="canSplit"
                        checked={data.canSplit}
                        onChange={(event) => this.handleSplit(event)} />
                    <i className="fa fa-level-down" />
                </label>}
            {(data.type === 'lowerAlpha' || data.type === 'upperAlpha') &&
                <label className={`rx_btn_icon ${data.isSensitive ? 'rx_checked' : ''}`}>
                    <input type="checkbox" data-ctrl="isSensitive"
                        checked={data.isSensitive}
                        onChange={(event) => this.handleSensitive(event)} />
                    <i className="fa fa-text-height" />
                </label>}
            <label className={`rx_btn_icon ${data.isOptional ? 'rx_checked' : ''}`}>
                <input type="checkbox" data-ctrl="isOptional"
                    checked={data.isOptional}
                    onChange={(event) => this.handleOptional(event)} />
                <i className="fa fa-exclamation" />
            </label>
            {data.type !== 'space' && !data.canSplit &&
                <label>
                    <input type="text" data-ctrl="minLength"
                        value={data.minLength}
                        className="input_num"
                        placeholder="Min."
                        disabled={data.isOptional}
                        onChange={(event) => this.handleMinValue(event)} />
                    <input type="text" data-ctrl="maxLength"
                        value={data.maxLength}
                        className="input_num"
                        placeholder="Max."
                        disabled={data.isConstant}
                        onChange={(event) => this.handleMaxValue(event)} />
                </label>}
            {data.type !== 'space' && !data.isConstant && !data.canSplit &&
                <label>
                    <input type="text" data-ctrl="alternateValues"
                        value={data.alternateValues}
                        className="input_text"
                        placeholder="Alternate Values"
                        onChange={(event) => this.handleAlternateValues(event)} />
                </label>}
        </div>);
    }
}