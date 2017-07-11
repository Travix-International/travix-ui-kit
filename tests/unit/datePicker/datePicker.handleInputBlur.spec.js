import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from '../../../components/datePicker/datePicker';

describe('DatePicker: handleInputBlur', () => {
  it('should call passed onBlur handler with correct data and set active to false', () => {
    const onBlur = jest.fn();
    const e = {};

    const component = shallow(
      <DatePicker name="datepicker" onBlur={onBlur} />
    );

    component.instance().setState({ active: true });
    component.instance().handleInputBlur(e);
    expect(component.instance().state.active).toEqual(false);
    expect(onBlur).toBeCalledWith(e);
  });

  it('should not call passed onBlur if onBlur is not a function', () => {
    const onBlur = jest.fn();

    const component = shallow(
      <DatePicker name="datepicker" />
    );

    component.instance().handleInputBlur();
    expect(onBlur).not.toBeCalled();
  });

  it('should not set active to false is "open" property is true', () => {
    const component = shallow(
      <DatePicker name="datepicker" open />
    );

    component.instance().setState({ active: true });
    component.instance().handleInputBlur();
    expect(component.instance().state.active).toEqual(true);
  });
});
