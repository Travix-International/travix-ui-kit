import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from '../../../components/datePicker/datePicker';

describe('DatePicker: blurInput', () => {
  it('should call passed blur method of input', () => {
    DatePicker.prototype.input = {
      blur: jest.fn(),
    };

    const component = shallow(
      <DatePicker name="datepicker" />
    );

    component.instance().blurInput();
    expect(component.instance().input.blur).toBeCalled();
  });

  it('should not call passed blur method of input if input not exist', () => {
    DatePicker.prototype.input = undefined;

    const component = shallow(
      <DatePicker name="datepicker" />
    );

    expect(component.instance().blurInput()).toEqual(undefined);
  });
});
