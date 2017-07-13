import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from '../../../components/datePicker/datePicker';

describe('AutoComplete: handleItemMouseDown', () => {
  it('should call passed preventDefault', () => {
    const e = {
      preventDefault: jest.fn(),
    };

    const component = shallow(
      <DatePicker name="datepicker" />
    );

    component.instance().handleItemMouseDown(e);
    expect(e.preventDefault).toBeCalled();
  });
});
