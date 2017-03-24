import React from 'react';
import { shallow } from 'enzyme';
import DropDown from '../../../components/dropDown/dropDown';

describe('DropDown: onOptionRef', () => {
  it('should call passed onOptionRef handler with correct arguments', () => {
    const onOptionRef = jest.fn();
    const onChange = jest.fn();
    const options = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
    ];

    const component = shallow(
      <DropDown
        onChange={onChange}
        options={options}
      />
    );

    component.instance().optionRef(onOptionRef, false)('ref');
    expect(onOptionRef).toBeCalledWith('ref', false);
  });
});
