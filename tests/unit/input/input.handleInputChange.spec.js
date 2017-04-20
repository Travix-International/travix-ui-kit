import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../../components/input/input';

describe('Input: handleInputChange', () => {
  it('should call passed onChange handler if onChange is function', () => {
    const e = { target: {} };
    const onChange = jest.fn();

    const component = shallow(
      <Input
        name="input"
        onChange={onChange}
      />
    );

    component.instance().handleInputChange(e);
    expect(component.state().isFocused).toEqual(false);
    expect(onChange).toBeCalledWith(e);
  });

  it('should not call passed onChange handler if onChange is not a function', () => {
    const e = { target: {} };
    const onChange = jest.fn();

    const component = shallow(
      <Input
        name="input"
      />
    );

    component.instance().handleInputChange(e);
    expect(onChange).not.toBeCalled();
  });
});
