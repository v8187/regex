/*
 * Class for the configuration of a part of Regular Expression String
 * and maintain it's state
 */
export class CategorizedValueModel {

    constructor(options) {

        this.chars = options.chars;
        Object.assign(this, {
            // If it is Uppercase, Lowercase, Number or Special character
            type: options.type,
            // Minimum length
            minLength: this.setVal(options.minLength, 1),
            // maximum length
            maxLength: this.setVal(options.maxLength, this.chars.length),
            // If the value is costant (To be used as it is)
            isConstant: this.setVal(options.isConstant, false),
            // Can the be further split
            canSplit: this.setVal(options.canSplit, false),
            // If Lowercase allowed
            canLower: this.hasLower(options.canLower),
            // If Uppercase allowed
            canUpper: this.hasUpper(options.canUpper),
            // If Numbers allowed
            canDigit: this.hasDigit(options.canDigit),
            // If Special Characters allowed
            canSpecial: this.hasSpecial(options.canSpecial),
            // If Space allowed
            canSpace: this.hasSpace(options.canSpace),
            // If it is an Optional part of RegEx
            isOptional: this.setVal(options.isOptional, false),
            // List of Split values (If has)
            splitted: this.setVal(options.splitted, null),
            // Custom values to be provided in Input field
            customValues: this.setVal(options.customValues, ''),
            /*
             * Type of Custom values to be provided in Input field
             * there are 3 kind of values can given in field:
             *      - any: Any random values of any type
             *      - list: List of words (Comma seperated) in foo,pal,pen Format
             *      - range: Multiple ranges in "a-m", "F-K" or "5-8" Format
             */
            customValType: this.setVal(options.customValType, 'any'),
            // If the value given in this part is to Exclude
            exclude: this.setVal(options.exclude, false),
            // Calculated RegEx string will be store here
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