export class CategorizedValueClass {
    
    constructor(type, chars) {
        this.isConstant = false;
        this.canSplit = false;
        this.isSensitive = false;
        this.isOptional = false;
        this.minLength = 1;
        this.maxLength = 1;
        this.type = null;
        this.chars = '';
        this.splitted = null;
        this.alternateValues = '';
        this.type = type;
        this.chars = chars;
        this.maxLength = this.chars.length;
    }
};