import { shallow } from 'enzyme';
import React from 'react';
import PropTypes from 'prop-types';
import DropDown from '../../../components/dropDown/dropDown';

const Wrapper = function Wrapper(props) {
  return <div>{props.children}</div>;
};

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
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

  it('should Renderer menu item with custome style and focused state', () => {
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
      focusedOption: options[0],
      instancePrefix: 'react-select-4-',
      onFocus: jest.fn(),
      onSelect: jest.fn(),
      optionClassName: 'class-name',
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
      className: 'Select-option class-name is-focused is-disabled',
      instancePrefix: 'react-select-4-',
      isDisabled: true,
      isFocused: true,
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

  it('should Renderer menu item with filter mode and selected state', () => {
    const onChange = jest.fn();
    const options = [{
      label: 'One',
      value: 1,
      disabled: true,
    }];

    const component = shallow(
      <DropDown
        filterMode
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
      valueArray: options,
      valueKey: 'value',
      onOptionRef: jest.fn(),
    };

    const menu = component.instance().menuRenderer(props);

    expect(menu[0].props).toEqual({
      children: <div />,
      className: 'Select-option is-selected is-disabled',
      instancePrefix: 'react-select-4-',
      isDisabled: true,
      isFocused: false,
      isSelected: true,
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
