import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from '../datePicker';

describe('DatePicker: handleInputFocus', () => {
  it('should call passed onFocus handler with correct data and set active to true', () => {
    const onFocus = jest.fn();
    const e = {};

    const component = shallow(
      <DatePicker name="datepicker" onFocus={onFocus} />
    );

    component.instance().setState({ active: false });
    component.instance().handleInputFocus(e);
    expect(component.instance().state.active).toEqual(true);
    expect(onFocus).toBeCalledWith(e);
  });

  it('should not call passed onFocus if onFocus is not a function', () => {
    const onFocus = jest.fn();

    const component = shallow(
      <DatePicker name="datepicker" />
    );

    component.instance().handleInputFocus();
    expect(onFocus).not.toBeCalled();
  });

  it('should not set satate and call func if "disabled" property is true', () => {
    const onFocus = jest.fn();

    const component = shallow(
      <DatePicker disabled name="datepicker" />
    );

    component.instance().setState({ active: false });
    component.instance().handleInputFocus();
    expect(component.instance().state.active).toEqual(false);
    expect(onFocus).not.toBeCalled();
  });
});
