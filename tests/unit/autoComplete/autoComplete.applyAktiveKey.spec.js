import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../../../components/autoComplete/autoComplete';
import AutoCompleteItem from '../../../components/autoComplete/autoCompleteItem';

describe('AutoComplete: applyAktiveKey', () => {
  it('should call methods and update state with correct data', () => {
    const data = {
      index: 1,
      value: 'test',
      code: 'C',
    };
    const instance = AutoComplete.prototype;
    instance.updateInput = jest.fn();
    instance.change = jest.fn();
    instance.blurInput = jest.fn();
    instance.render = jest.fn();
    instance.items = [
      { getValue: jest.fn(() => data) },
    ];

    const e = {
      preventDefault: jest.fn(),
      keyCode: 13,
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

    component.instance().setState({ inputValue: 'test', activeKey: 0 });
    component.instance().applyAktiveKey(e);
    expect(component.instance().state).toEqual({
      activeKey: 0,
      inputValue: data.value,
      open: false,
      selectedValue: data.code,
    });
    expect(e.preventDefault).toBeCalled();
    expect(component.instance().updateInput).toBeCalledWith(data.value);
    expect(component.instance().change).toBeCalledWith(data);
    expect(component.instance().blurInput).toBeCalled();
  });

  it('should call methods and update state with correct data (without code and active key)', () => {
    const data = {
      index: 1,
      value: 'test',
    };
    const instance = AutoComplete.prototype;
    instance.updateInput = jest.fn();
    instance.change = jest.fn();
    instance.blurInput = jest.fn();
    instance.render = jest.fn();
    instance.initActiveKey = 2;
    instance.items = [{}, {}, { getValue: jest.fn(() => data) }];

    const e = {
      preventDefault: jest.fn(),
      keyCode: 13,
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

    component.instance().setState({ inputValue: 'test' });
    component.instance().applyAktiveKey(e);
    expect(component.instance().state).toEqual({
      activeKey: 0,
      inputValue: data.value,
      open: false,
      selectedValue: data.value,
    });
    expect(e.preventDefault).toBeCalled();
    expect(component.instance().updateInput).toBeCalledWith(data.value);
    expect(component.instance().change).toBeCalledWith(data);
    expect(component.instance().blurInput).toBeCalled();
  });

  it('should call methods and update state with correct data when we have nothing for selecting', () => {
    const instance = AutoComplete.prototype;
    instance.updateInput = jest.fn();
    instance.change = jest.fn();
    instance.blurInput = jest.fn();
    instance.render = jest.fn();

    const e = {
      preventDefault: jest.fn(),
      keyCode: 10,
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

    component.instance().applyAktiveKey(e);
    expect(component.instance().state).toEqual({
      activeKey: undefined,
      inputValue: undefined,
      open: false,
      selectedValue: undefined,
    });
    expect(e.preventDefault).toBeCalled();
    expect(component.instance().updateInput).toBeCalledWith(undefined);
    expect(component.instance().change).toBeCalledWith(undefined);
    expect(component.instance().blurInput).toBeCalled();
  });
});
