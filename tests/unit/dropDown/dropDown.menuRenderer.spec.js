import { shallow } from 'enzyme';
import React from 'react';
import DropDown from '../../../components/dropDown/dropDown';

class Wrapper extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

Wrapper.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
};

describe('DropDown: menuRenderer', () => {
  it('should Renderer menu item with correct props', () => {
    const onChange = jest.fn();
    const options = [{
      label: 'One',
      value: 1,
      disabled: true,
    }];

    const component = shallow(
      <DropDown
        onChange={onChange}
        options={options}
      />
    );

    const props = {
      focusedOption: { label: 'Two', value: 2, checked: true },
      instancePrefix: 'react-select-4-',
      onFocus: jest.fn(),
      onSelect: jest.fn(),
      optionClassName: undefined,
      optionComponent: Wrapper,
      optionRenderer: jest.fn().mockReturnValueOnce(<div/>),
      options: options,
      valueArray: null,
      valueKey: 'value',
      onOptionRef: jest.fn(),
    };

    const menu = component.instance().menuRenderer(props);

    expect(menu[0].props).toEqual({
      children: <div />,
      className: 'Select-option is-disabled',
      instancePrefix: 'react-select-4-',
      isDisabled: true,
      isFocused: false,
      isSelected: null,
      onFocus: props.onFocus,
      onSelect: props.onSelect,
      option: {
        disabled: true,
        label: 'One',
        value: 1,
      },
      optionIndex: 0,
    });
  });
});
