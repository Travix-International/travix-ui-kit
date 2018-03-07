import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../autoComplete';
import AutoCompleteItem from '../autoCompleteItem/AutoCompleteItem';

describe('AutoComplete: handleItemClick', () => {
  it('should be updated state with correct data and call the necessary methods', () => {
    AutoComplete.prototype.change = jest.fn();
    AutoComplete.prototype.updateInput = jest.fn();
    AutoComplete.prototype.blurInput = jest.fn();

    const e = {
      stopPropagation: jest.fn(),
    };

    const data = {
      index: 1,
      value: 'value',
      code: 'code',
    };

    const component = shallow(
      <AutoComplete
        name="autocomplete"
      >
        <AutoCompleteItem
          value="value"
        >
          item
        </AutoCompleteItem>
      </AutoComplete>
    );

    component.instance().handleItemClick(e, data);
    expect(component.instance().state).toEqual({
      activeKey: undefined,
      inputValue: 'value',
      open: false,
      selectedKey: undefined,
      selectedValue: 'code',
    });
    expect(e.stopPropagation).toBeCalled();
    expect(component.instance().change).toBeCalledWith(data);
    expect(component.instance().blurInput).toBeCalled();
  });

  it('should be updated state with correct data (without code) and call the necessary methods', () => {
    AutoComplete.prototype.change = jest.fn();
    AutoComplete.prototype.updateInput = jest.fn();
    AutoComplete.prototype.blurInput = jest.fn();

    const e = {
      stopPropagation: jest.fn(),
    };

    const data = {
      index: 1,
      value: 'value',
    };

    const component = shallow(
      <AutoComplete
        name="autocomplete"
      >
        <AutoCompleteItem
          value="value"
        >
          item
        </AutoCompleteItem>
      </AutoComplete>
    );

    component.instance().handleItemClick(e, data);
    expect(component.instance().state).toEqual({
      activeKey: undefined,
      inputValue: 'value',
      open: false,
      selectedKey: undefined,
      selectedValue: 'value',
    });
    expect(e.stopPropagation).toBeCalled();
    expect(component.instance().change).toBeCalledWith(data);
    expect(component.instance().blurInput).toBeCalled();
  });
});
