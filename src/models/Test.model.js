export class TestModel {
    constructor(options) {
        this.value = options && options.value !== undefined ? options.value : '';
        this.passed = options && options.passed !== undefined ? options.passed : false;
    }
};