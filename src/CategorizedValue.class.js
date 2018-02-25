export class CategorizedValueClass {

    constructor(type, chars) {
        this.type = type;
        this.chars = chars;
        this.minLength = 1;
        this.maxLength = this.chars.length;
        this.isConstant = false;
        this.canSplit = false;
        this.isLower = type === 'lowerAlpha';
        this.isUpper = type === 'upperAlpha';
        this.isOptional = false;
        this.splitted = null;
        this.customValues = '';
        this.exclude = false;
        this.regEx = '';
        this.alphabets = type.indexOf('Alpha') !== -1;
        this.digits = type === 'digit';
        this.specialChars = type === 'special';
    }
};