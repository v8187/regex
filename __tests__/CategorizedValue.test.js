import React from 'react';
import { shallow } from 'enzyme';

import { CategorizedValue } from '../src/CategorizedValue';
import { CategorizedValueClass } from '../src/CategorizedValue.class';

test('CategorizedValue hides the "Can Split" Control on selecting "Is Static"', () => {
    let dummyData = new CategorizedValueClass('lowerAlpha', 'sdsad'),
        instyance = null;

    const categorizedValue = <CategorizedValue ref={(categorizedValue) => { instyance = categorizedValue; }} data={dummyData} onChange={data => { console.log(data); }} />;
    shallow(categorizedValue);
    console.log(categorizedValue.handleStatic, instyance);
    console.log(shallow(categorizedValue).handleStatic);
    /*  expect(categorizedValue.text()).toEqual('Off');
 
     categorizedValue.find('input').simulate('change');
 
     expect(categorizedValue.text()).toEqual('On'); */
});