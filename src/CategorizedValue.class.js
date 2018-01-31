export class CategorizedValue {
    isStatic = false;
    canSplit = false;
    isSensitive = false;
    isOptional = false;
    minLength = 1;
    maxLength = 1;
    type = null;
    chars = '';
    splitted = null;
    customList = '';

    constructor(type, chars) {
        this.type = type;
        this.chars = chars;
        this.maxLength = this.chars.length;
    }
};