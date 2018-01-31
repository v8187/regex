import React from 'react';
import { shallow } from 'enzyme';

import { CategorizedValue } from '../src/CategorizedValue';
import { CategorizedValueClass } from '../src/CategorizedValue.class';

describe('CategorizedValue: If "Is Static" is checked', () => {
    const dummyData = new CategorizedValueClass('lowerAlpha', 'fsde'),
        wpr = shallow(<CategorizedValue data={dummyData} onChange={data => { }} />);

    wpr.find('[data-ctrl="canSplit"]').simulate('change', { target: { checked: true } });
    wpr.find('[data-ctrl="isStatic"]').simulate('change', { target: { checked: true } });

    it('hides the "Can Split" Control', () => {
        expect(wpr.find({ "data-ctrl": "canSplit" }).length).toBe(0);
    });

    it('hides the "Custom List" Control', () => {
        expect(wpr.find({ "data-ctrl": "customList" }).length).toBe(0);
    });

    it('hides the "Splitted" Controls', () => {
        expect(wpr.state().data.splitted).toBe(null);
    });
});

describe('CategorizedValue: If "Is Static" is unchecked', () => {
    const dummyData = new CategorizedValueClass('lowerAlpha', 'fsde'),
        wpr = shallow(<CategorizedValue data={dummyData} onChange={data => { }} />);

    wpr.find('[data-ctrl="isStatic"]').simulate('change', { target: { checked: false } });

    it('shows the "Can Split" Control', () => {
        expect(wpr.find({ "data-ctrl": "canSplit" }).length).toBe(1);
    });

    it('shows the "Custom List" Control', () => {
        expect(wpr.find({ "data-ctrl": "customList" }).length).toBe(1);
    });
});

/* test('CategorizedValue: Hide the "Can Split" Control on selecting "Is Static"', () => {
    const dummyData = new CategorizedValueClass('lowerAlpha', 'fsde'),
        wpr = shallow(<CategorizedValue data={dummyData} onChange={data => { }} />);

    expect(wpr.find({ "data-ctrl": "canSplit" }).length).toBe(1);
    wpr.find('[data-ctrl="isStatic"]').simulate('change', { target: { checked: true } });
    expect(wpr.find({ "data-ctrl": "canSplit" }).length).toBe(0);
});

test('CategorizedValue: Hide the "Custom List" Control on selecting "Is Static"', () => {
    const dummyData = new CategorizedValueClass('lowerAlpha', 'fsde'),
        wpr = shallow(<CategorizedValue data={dummyData} onChange={data => { }} />);

    expect(wpr.find({ "data-ctrl": "customList" }).length).toBe(1);
    wpr.find('[data-ctrl="isStatic"]').simulate('change', { target: { checked: true } });
    expect(wpr.find({ "data-ctrl": "customList" }).length).toBe(0);
}); */

test('CategorizedValue: Hide the "Min legth" Control on selecting "Optional"', () => {
    const dummyData = new CategorizedValueClass('lowerAlpha', 'fsde'),
        wpr = shallow(<CategorizedValue data={dummyData} onChange={data => { }} />);

    expect(wpr.find({ "data-ctrl": "minLength" }).length).toBe(1);
    wpr.find('[data-ctrl="isOptional"]').simulate('change', { target: { checked: true } });
    expect(wpr.find({ "data-ctrl": "minLength" }).length).toBe(0);
});

test('CategorizedValue: By default "Max Length" must be equal to the length of "Chars"', () => {
    const chars = 'fsde',
        dummyData = new CategorizedValueClass('lowerAlpha', chars),
        wpr = shallow(<CategorizedValue data={dummyData} onChange={data => { }} />);

    expect(wpr.state().data.maxLength).toBe(chars.length);
});

test('CategorizedValue: Split the Chars on selecting "Can Split"', () => {
    const chars = 'fsde',
        dummyData = new CategorizedValueClass('lowerAlpha', chars),
        wpr = shallow(<CategorizedValue data={dummyData} onChange={data => { }} />);

    expect(wpr.state().data.splitted).toBe(null);
    wpr.find('[data-ctrl="canSplit"]').simulate('change', { target: { checked: true } });
    expect(wpr.state().data.splitted).toEqual([
        new CategorizedValueClass('lowerAlpha', 'f'),
        new CategorizedValueClass('lowerAlpha', 's'),
        new CategorizedValueClass('lowerAlpha', 'd'),
        new CategorizedValueClass('lowerAlpha', 'e')
    ]);
});