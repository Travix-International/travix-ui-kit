import React from 'react';
import { shallow } from 'enzyme';
import Input from '../input';

describe('Input: handleInputBlur', () => {
  it('should call passed onBlur handler if onBlur is function', () => {
    const e = { target: {} };
    const onBlur = jest.fn();

    const component = shallow(
      <Input
        name="input"
        onBlur={onBlur}
      />
    );

    component.instance().handleInputBlur(e);
    expect(component.state().isFocused).toEqual(false);
    expect(onBlur).toBeCalledWith(e);
  });

  it('should not call passed onBlur handler if onBlur is not a function', () => {
    const e = { target: {} };
    const onBlur = jest.fn();

    const component = shallow(
      <Input
        name="input"
      />
    );

    component.instance().handleInputBlur(e);
    expect(onBlur).not.toBeCalled();
  });
});
