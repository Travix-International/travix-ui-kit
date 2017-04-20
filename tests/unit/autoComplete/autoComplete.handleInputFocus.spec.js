import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../../../components/autoComplete/autoComplete';
import AutoCompleteItem from '../../../components/autoComplete/autoCompleteItem';

describe('AutoComplete: handleInputFocus', () => {
  it('should call selectInput and update state with correct data', () => {
    AutoComplete.prototype.selectInput = jest.fn();
    const onFocus = jest.fn();
    const e = { target: {} };

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

    component.instance().handleInputFocus(e);
    expect(component.instance().state.open).toEqual(true);
    expect(component.instance().state.activeKey).toEqual(0);
    expect(component.instance().selectInput).toBeCalled();
    expect(onFocus).not.toBeCalled();
  });

  it('should not update state when open is true', () => {
    AutoComplete.prototype.selectInput = jest.fn();
    const onFocus = jest.fn();
    const e = { target: {} };

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

    component.instance().setState({ open: true });
    component.instance().handleInputFocus(e);
    expect(component.instance().state.activeKey).toEqual(undefined);
    expect(onFocus).not.toBeCalled();
  });

  it('should call passed onFocus with correct data', () => {
    AutoComplete.prototype.selectInput = jest.fn();
    const onFocus = jest.fn();
    const e = { target: {} };

    const component = shallow(
      <AutoComplete
        name="autocomplete"
        onFocus={onFocus}
      >
        <AutoCompleteItem
          value="value"
        >
          item
        </AutoCompleteItem>
      </AutoComplete>
    );

    component.instance().handleInputFocus(e);
    expect(onFocus).toBeCalledWith(e);
  });

  it('should update state with correct active key info', () => {
    AutoComplete.prototype.selectInput = jest.fn();
    const onFocus = jest.fn();
    const e = { target: {} };

    const component = shallow(
      <AutoComplete
        name="autocomplete"
        onFocus={onFocus}
      >
        <AutoCompleteItem
          value="value"
        >
          item
        </AutoCompleteItem>
      </AutoComplete>
    );

    component.instance().setState({ activeKey: 5 });
    component.instance().handleInputFocus(e);
    expect(component.instance().state.activeKey).toEqual(5);
  });
});
