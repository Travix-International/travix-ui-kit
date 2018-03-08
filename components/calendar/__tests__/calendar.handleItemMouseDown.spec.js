import { shallow } from 'enzyme';
import React from 'react';
import Calendar from '../calendar';

describe('Calendar: handleItemMouseDown', () => {
  it('should call passed onMouseDown handler with correct data', () => {
    const onMouseDown = jest.fn();
    const e = {};

    const component = shallow(
      <Calendar
        onMouseDown={onMouseDown}
      />
    );

    component.instance().handleItemMouseDown(e);
    expect(onMouseDown).toBeCalledWith(e);
  });

  it('should not call passed onMouseDown if onMouseDown is not a function', () => {
    const onMouseDown = jest.fn();
    const e = {};

    const component = shallow(
      <Calendar />
    );

    component.instance().handleItemMouseDown(e);
    expect(onMouseDown).not.toBeCalled();
  });
});
