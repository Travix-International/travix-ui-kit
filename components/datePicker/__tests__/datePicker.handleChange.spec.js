import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from '../datePicker';

describe('DatePicker: handleChange', () => {
  it('should call passed onChange handler with correct data', () => {
    DatePicker.prototype.blurInput = jest.fn();
    const onChange = jest.fn();
    const e = {};

    const component = shallow(
      <DatePicker name="datepicker" onChange={onChange} />
    );

    component.instance().handleChange(e);
    expect(component.instance().blurInput).toBeCalled();
    expect(onChange).toBeCalledWith(e);
  });

  it('should not call passed onChange if onChange is not a function', () => {
    DatePicker.prototype.blurInput = jest.fn();
    const onChange = jest.fn();

    const component = shallow(
      <DatePicker name="datepicker" />
    );

    component.instance().handleChange();
    expect(component.instance().blurInput).toBeCalled();
    expect(onChange).not.toBeCalled();
  });
});
