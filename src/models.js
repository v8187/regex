class BaseModel {
    id = '';
};

export class Token extends BaseModel {
    get className() { return 'token-control'; }
    get type() { return 'token'; }
    value = '';
    canJoin = false;
};

export class BList extends BaseModel {
    get className() { return 'list-control'; }
    get type() { return 'bList'; }
    value = '';
    get label() { return 'Begin List'; }
};

export class EList extends BaseModel {
    get className() { return 'list-control'; }
    get type() { return 'eList'; }
    value = '';
    get label() { return 'End List'; }
};

export class BGroup extends BaseModel {
    get className() { return 'group-control'; }
    get type() { return 'bGroup'; }
    value = '';
    get label() { return 'Begin Group'; }
};

export class EGroup extends BaseModel {
    get className() { return 'group-control'; }
    get type() { return 'eGroup'; }
    value = '';
    get label() { return 'End Group'; }
};

export const specialCharacters = '~!@#$%^&*()_+{}|:"<>?`-=[]\\;\',./';