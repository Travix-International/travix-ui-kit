import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from '../datePicker';

describe('DatePicker: focusInput', () => {
  it('should call passed focus method of input', () => {
    DatePicker.prototype.input = {
      focus: jest.fn(),
    };

    const component = shallow(
      <DatePicker name="datepicker" />
    );

    component.instance().focusInput();
    expect(component.instance().input.focus).toBeCalled();
  });

  it('should not call passed focus method of input if input not exist', () => {
    DatePicker.prototype.input = undefined;

    const component = shallow(
      <DatePicker name="datepicker" />
    );

    expect(component.instance().focusInput()).toEqual(undefined);
  });
});
