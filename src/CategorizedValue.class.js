export class CategorizedValueClass {

    constructor(type, chars) {
        this.type = type;
        this.chars = chars;
        this.minLength = 1;
        this.maxLength = this.chars.length;
        this.isConstant = false;
        this.canSplit = false;
        this.digits = type === 'digit';
        this.specialChars = type === 'special';
        this.alphabets = type.indexOf('Alpha') !== -1;
        this.isLower = this.alphabets;
        this.isUpper = this.alphabets;
        this.isOptional = false;
        this.splitted = null;
        this.customValues = '';
        this.exclude = false;
        this.regEx = '';
    }
};