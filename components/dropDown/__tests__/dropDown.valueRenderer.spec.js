import { shallow } from 'enzyme';
import React from 'react';
import DropDown from '../dropDown';

describe('DropDown: valueRenderer', () => {
  it('should Renderer value item with correct props', () => {
    const onChange = jest.fn();
    const options = [
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
      { value: 3, label: 'Three' },
    ];

    const props = options[0];

    const component = shallow(
      <DropDown
        icon="iconClass"
        onChange={onChange}
        options={options}
      />
    );

    const value = component.instance().valueRenderer(props);

    expect(value.props).toEqual({
      children: 'One',
      className: 'Select-value-label-icon iconClass',
    });
  });
});
