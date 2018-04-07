import React from 'react';
import { shallow } from 'enzyme';

import { CategorizedValue } from '../src/CategorizedValue';
import { CategorizedValueModel } from '../src/../models/CategorizedValue.model';

export const rndWrapper = (dumData) => {
    return shallow(<CategorizedValue data={dumData} onChange={data => { }} />);
};
export const catVal = (type, chars) => {
    return new CategorizedValueModel({ type: type, chars: chars });
};
export const _find = (wrapper, ref) => {
    return wrapper.find(`[data-ctrl="${ref}"]`);
};
export const _props = (wrapper, ref) => {
    return _find(wrapper, ref).props();
};