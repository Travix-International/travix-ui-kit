import React from 'react';
import { shallow } from 'enzyme';
import DropdownFilterOptionComponent from '../../../components/dropDown/dropdownFilterOptionComponent';

describe('DropdownFilterOptionComponent: onChange', () => {
  it('should select', () => {
    DropdownFilterOptionComponent.prototype.onChange = jest.fn();

    const option = {
      label: 'Three',
      value: '3',
    };

    const onSelect = jest.fn();
    const children = 'Three';

    const component = shallow(
      <DropdownFilterOptionComponent
        onSelect={onSelect}
        option={option}
      >
        {children}
      </DropdownFilterOptionComponent>
    );

    expect(onSelect).not.toBeCalled();

    component.instance().onChange();
    expect(onSelect).toBeCalled();
  });
});
