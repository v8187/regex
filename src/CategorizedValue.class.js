export class CategorizedValueClass {

    constructor(options) {

        this.chars = options.chars;
        Object.assign(this, {
            type: options.type,
            minLength: this.setVal(options.minLength, 1),
            maxLength: this.setVal(options.maxLength, this.chars.length),
            isConstant: this.setVal(options.isConstant, false),
            canSplit: this.setVal(options.canSplit, false),
            // alphabets: type.indexOf('Alpha') !== -1,
            canLower: this.hasLower(options.canLower),
            canUpper: this.hasUpper(options.canUpper),
            canDigit: this.hasDigit(options.canDigit),
            canSpecial: this.hasSpecial(options.canSpecial),
            canSpace: this.hasSpace(options.canSpace),
            isOptional: this.setVal(options.isOptional, false),
            splitted: this.setVal(options.splitted, null),
            customValues: this.setVal(options.customValues, ''),
            customValType: this.setVal(options.customValType, 'any'),
            exclude: this.setVal(options.exclude, false),
            regEx: this.setVal(options.regEx, '')
        });

    }

    setVal(optVal, altVal) {
        return optVal !== undefined ? optVal : altVal;
    }

    hasLower(bool) {
        this.canLower = bool !== undefined ? bool : /[a-z]/.test(this.chars);
        return this.canLower;
    }

    hasUpper(bool) {
        this.canUpper = bool !== undefined ? bool : /[A-Z]/.test(this.chars);
        return this.canUpper;
    }

    hasDigit(bool) {
        this.canDigit = bool !== undefined ? bool : /\d/.test(this.chars);
        return this.canDigit;
    }

    hasSpecial(bool) {
        this.canSpecial = bool !== undefined ? bool : /[^a-zA-Z\d\s]/.test(this.chars);
        return this.canSpecial;
    }

    hasSpace(bool) {
        this.canSpace = bool !== undefined ? bool : /\s/.test(this.chars);
        return this.canSpace;
    }
};