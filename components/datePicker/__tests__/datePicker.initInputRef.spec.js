import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from '../datePicker';

describe('DatePicker: initInputRef', () => {
  it('should determine ref for input', () => {
    const element = {};

    const component = shallow(
      <DatePicker name="datepicker" />
    );

    component.instance().initInputRef(element);
    expect(component.instance().input).toEqual(element);
  });
});
