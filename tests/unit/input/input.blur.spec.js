import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../../components/input/input';

describe('Input: blur', () => {
  it('should call passed blur handler if element is exist', () => {
    const element = {
      blur: jest.fn(),
    };

    const component = shallow(
      <Input
        name="input"
      />
    );

    component.instance().ref(element);
    component.instance().blur();
    expect(element.blur).toBeCalled();
  });

  it('should not call passed blur handler if element not exist', () => {
    const element = {
      blur: jest.fn(),
    };

    const component = shallow(
      <Input
        name="input"
      />
    );

    component.instance().blur();
    expect(element.blur).not.toBeCalled();
  });
});
