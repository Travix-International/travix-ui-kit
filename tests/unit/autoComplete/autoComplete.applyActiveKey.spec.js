import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../../../components/autoComplete/autoComplete';
import AutoCompleteItem from '../../../components/autoComplete/autoCompleteItem';

describe('AutoComplete: applyActiveKey', () => {
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
    instance.close = jest.fn();
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
    component.instance().applyActiveKey(e);
    expect(component.instance().state).toEqual({
      activeKey: undefined,
      inputValue: data.value,
      open: false,
      selectedKey: undefined,
      selectedValue: data.code,
    });
    expect(e.preventDefault).toBeCalled();
    expect(component.instance().change).toBeCalledWith(data);
    expect(component.instance().blurInput).toBeCalled();
  });

  it('should call close methods is we have the same value', () => {
    const data = {
      index: 1,
      value: 'test',
      code: 'C',
    };
    const instance = AutoComplete.prototype;
    instance.updateInput = jest.fn();
    instance.change = jest.fn();
    instance.blurInput = jest.fn();
    instance.close = jest.fn();
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

    component.instance().setState({ selectedValue: 'C', inputValue: 'test', activeKey: 0 });
    component.instance().applyActiveKey(e);
    expect(component.instance().state).toEqual({
      activeKey: 0,
      inputValue: data.value,
      open: false,
      selectedKey: undefined,
      selectedValue: data.code,
    });
    expect(e.preventDefault).toBeCalled();
    expect(component.instance().close).toBeCalled();
  });

  it('should call methods and update state with correct data (without code and active key)', () => {
    const data = {
      key: 1,
      index: 1,
      value: 'test',
    };
    const instance = AutoComplete.prototype;
    instance.updateInput = jest.fn();
    instance.change = jest.fn();
    instance.blurInput = jest.fn();
    instance.close = jest.fn();
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
    component.instance().applyActiveKey(e);
    expect(component.instance().state).toEqual({
      activeKey: undefined,
      inputValue: data.value,
      open: false,
      selectedKey: 1,
      selectedValue: data.value,
    });
    expect(e.preventDefault).toBeCalled();
    expect(component.instance().change).toBeCalledWith(data);
    expect(component.instance().blurInput).toBeCalled();
  });

  it('should call methods and update state with correct data when we have nothing for selecting', () => {
    const instance = AutoComplete.prototype;
    instance.updateInput = jest.fn();
    instance.change = jest.fn();
    instance.close = jest.fn();
    instance.blurInput = jest.fn();

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

    component.instance().setState({ selectedValue: 'test' });
    component.instance().applyActiveKey(e);

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

  it('should call methods and update state with correct data when we have nothing for selecting', () => {
    const instance = AutoComplete.prototype;
    instance.updateInput = jest.fn();
    instance.change = jest.fn();
    instance.close = jest.fn();
    instance.blurInput = jest.fn();

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

    component.instance().applyActiveKey(e);

    expect(component.instance().state).toEqual({
      activeKey: undefined,
      inputValue: undefined,
      open: false,
      selectedValue: undefined,
    });
    expect(e.preventDefault).toBeCalled();
    expect(component.instance().close).toBeCalled();
  });

  it('should update input value and state with correct data', () => {
    const data = {
      index: 1,
      value: 'test_test',
      code: 'C',
    };
    const instance = AutoComplete.prototype;
    instance.updateInput = jest.fn();
    instance.change = jest.fn();
    instance.blurInput = jest.fn();
    instance.close = jest.fn();
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

    component.instance().setState({ inputValue: 'test', selectedValue: data.code, activeKey: 0 });
    component.instance().applyActiveKey(e);
    expect(component.instance().state).toEqual({
      activeKey: 0,
      inputValue: data.value,
      open: false,
      selectedKey: undefined,
      selectedValue: data.code,
    });
    expect(e.preventDefault).toBeCalled();
    expect(component.instance().updateInput).toBeCalledWith(data.value);
  });
});
