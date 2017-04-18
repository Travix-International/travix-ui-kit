import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../../components/input/input';

describe('Input: select', () => {
  it('should call passed select handler if element is exist', () => {
    const element = {
      select: jest.fn(),
    };

    const component = shallow(
      <Input
        name="input"
      />
    );

    component.instance().ref(element);
    component.instance().select();
    expect(element.select).toBeCalled();
  });

  it('should not call passed select handler if element not exist', () => {
    const element = {
      select: jest.fn(),
    };

    const component = shallow(
      <Input
        name="input"
      />
    );

    component.instance().select();
    expect(element.select).not.toBeCalled();
  });
});
