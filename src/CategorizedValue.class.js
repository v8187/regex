export class CategorizedValueClass {

    constructor(type, chars) {
        this.type = type;
        this.chars = chars;
        this.minLength = 1;
        this.maxLength = this.chars.length;
        this.isConstant = false;
        this.canSplit = false;
        // this.alphabets = type.indexOf('Alpha') !== -1;
        this.canLower = this.hasLower();
        this.canUpper = this.hasUpper();
        this.canDigit = this.hasDigit();
        this.canSpecial = this.hasSpecial();
        this.isOptional = false;
        this.splitted = null;
        this.customValues = '';
        this.customValType = 'any';
        this.exclude = false;
        this.regEx = '';
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
};