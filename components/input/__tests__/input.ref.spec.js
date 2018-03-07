import React from 'react';
import { shallow } from 'enzyme';
import Input from '../input';

describe('Input: ref', () => {
  it('should determine ref for input', () => {
    const element = {};

    const component = shallow(
      <Input
        name="input"
      />
    );

    component.instance().ref(element);
    expect(component.instance().input).toEqual(element);
  });
});
