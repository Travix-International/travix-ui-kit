import React from 'react';
import { shallow } from 'enzyme';
import Input from '../input';

describe('Input: focus', () => {
  it('should call passed focus handler if element is exist', () => {
    const element = {
      focus: jest.fn(),
    };

    const component = shallow(
      <Input
        name="input"
      />
    );

    component.instance().ref(element);
    component.instance().focus();
    expect(element.focus).toBeCalled();
  });

  it('should not call passed focus handler if element not exist', () => {
    const element = {
      focus: jest.fn(),
    };

    const component = shallow(
      <Input
        name="input"
      />
    );

    component.instance().focus();
    expect(element.focus).not.toBeCalled();
  });
});
