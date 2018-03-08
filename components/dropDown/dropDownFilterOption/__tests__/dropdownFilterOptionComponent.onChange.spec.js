import React from 'react';
import { shallow } from 'enzyme';
import DropDownFilterOption from '../dropDownFilterOption';

describe('DropdownFilterOptionComponent: onChange', () => {
  it('should select', () => {
    DropDownFilterOption.prototype.onChange = jest.fn();

    const option = {
      label: 'Three',
      value: '3',
    };

    const onSelect = jest.fn();
    const children = 'Three';

    const component = shallow(
      <DropDownFilterOption
        onSelect={onSelect}
        option={option}
      >
        {children}
      </DropDownFilterOption>
    );

    expect(onSelect).not.toBeCalled();

    component.instance().onChange();
    expect(onSelect).toBeCalled();
  });
});
