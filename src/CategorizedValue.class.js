export class CategorizedValueClass {

    constructor(options) {
        this.type = options.type;
        this.chars = options.chars;
        this.minLength = options.minLength || 1;
        this.maxLength = options.maxLength || this.chars.length;
        this.isConstant = options.isConstant || false;
        this.canSplit = options.canSplit || false;
        // this.alphabets = type.indexOf('Alpha') !== -1;
        this.canLower = this.hasLower();
        this.canUpper = this.hasUpper();
        this.canDigit = this.hasDigit();
        this.canSpecial = this.hasSpecial();
        this.canSpace = this.hasSpace();
        this.isOptional = options.isOptional || false;
        this.splitted = options.splitted || null;
        this.customValues = options.customValues || '';
        this.customValType = options.customValType || 'any';
        this.exclude = options.exclude || false;
        this.regEx = options.regEx || '';
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