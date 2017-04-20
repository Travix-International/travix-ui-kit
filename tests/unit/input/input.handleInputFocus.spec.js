import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../../components/input/input';

describe('Input: handleInputFocus', () => {
  it('should call passed onFocus handler if onBlur is function', () => {
    const e = { target: {} };
    const onFocus = jest.fn();

    const component = shallow(
      <Input
        name="input"
        onFocus={onFocus}
      />
    );

    component.instance().handleInputFocus(e);
    expect(component.state().isFocused).toEqual(true);
    expect(onFocus).toBeCalledWith(e);
  });

  it('should not call passed onFocus handler if onFocus is not a function', () => {
    const e = { target: {} };
    const onFocus = jest.fn();

    const component = shallow(
      <Input
        disabled
        name="input"
        onFocus={onFocus}
      />
    );

    component.instance().handleInputFocus(e);
    expect(onFocus).not.toBeCalled();
  });

  it('should not call passed onFocus handler when input was disabled', () => {
    const e = { target: {} };
    const onFocus = jest.fn();

    const component = shallow(
      <Input
        name="input"
      />
    );

    component.instance().handleInputFocus(e);
    expect(onFocus).not.toBeCalled();
  });
});
