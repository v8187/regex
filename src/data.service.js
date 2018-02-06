import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

// Observable sources
const __ = {
    inputValueSource: new BehaviorSubject('asdfe23fdADf5656'),
    currentTabSource: new BehaviorSubject('input'),
    categorizedValuesSource: new BehaviorSubject([])
};

class DataService {

    constructor() {
        // Observable streams
        this.inputValue$ = __.inputValueSource.asObservable();
        this.currentTab$ = __.currentTabSource.asObservable();
        this.categorizedValues$ = __.categorizedValuesSource.asObservable();
    }

    data(sourceName, value) {
        if (!__[`${sourceName}Source`]) {
            return null;
        }
        if (value === undefined) {
            return __[`${sourceName}Source`].value;
        } else {
            __[`${sourceName}Source`].next(value);
        }
    }
};

module.exports = new DataService();