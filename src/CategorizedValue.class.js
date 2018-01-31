export class CategorizedValueClass {

    constructor(type, chars) {
        this.type = type;
        this.chars = chars;
        this.minLength = 1;
        this.maxLength = this.chars.length;
        this.isConstant = false;
        this.canSplit = false;
        this.isSensitive = false;
        this.isOptional = false;
        this.splitted = null;
        this.alternateValues = '';
        this.regEx = '';
    }
};