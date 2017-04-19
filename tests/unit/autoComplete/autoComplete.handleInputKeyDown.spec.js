import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../../../components/autoComplete/autoComplete';
import AutoCompleteItem from '../../../components/autoComplete/autoCompleteItem';

describe('AutoComplete: handleInputKeyDown', () => {
  it('should not call methods when onKeyDown is not a function or key code is not monitored', () => {
    AutoComplete.prototype.focusItem = jest.fn();
    AutoComplete.prototype.applyAktiveKey = jest.fn();
    const onKeyDown = jest.fn();
    const e = {
      keyCode: 666,
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

    component.instance().handleInputKeyDown(e);
    expect(onKeyDown).not.toBeCalled();
    expect(component.instance().focusItem).not.toBeCalled();
    expect(component.instance().applyAktiveKey).not.toBeCalled();
  });

  it('should have correct behavior when press key "down"', () => {
    AutoComplete.prototype.focusItem = jest.fn();
    AutoComplete.prototype.applyAktiveKey = jest.fn();
    const onKeyDown = jest.fn();
    const e = {
      keyCode: 40,
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
        <AutoCompleteItem
          value="value"
        >
          item
        </AutoCompleteItem>
        <AutoCompleteItem
          value="value"
        >
          item
        </AutoCompleteItem>
      </AutoComplete>
    );

    component.instance().setState({ activeKey: 0 });
    component.instance().handleInputKeyDown(e);
    expect(onKeyDown).not.toBeCalled();
    expect(component.instance().focusItem).toBeCalledWith(e, 1);
    expect(component.instance().applyAktiveKey).not.toBeCalled();

    component.instance().setState({ activeKey: 1 });
    component.instance().handleInputKeyDown(e);
    expect(component.instance().focusItem).toBeCalledWith(e, 2);

    component.instance().setState({ activeKey: 2 });
    component.instance().handleInputKeyDown(e);
    expect(component.instance().focusItem).toBeCalledWith(e, 2);
  });

  it('should call passed onKeyDown handler when onKeyDown is a function', () => {
    AutoComplete.prototype.focusItem = jest.fn();
    AutoComplete.prototype.applyAktiveKey = jest.fn();
    const onKeyDown = jest.fn();
    const e = {
      keyCode: 40,
    };
    const component = shallow(
      <AutoComplete
        name="autocomplete"
        onKeyDown={onKeyDown}
      >
        <AutoCompleteItem
          value="value"
        >
          item
        </AutoCompleteItem>
      </AutoComplete>
    );

    component.instance().handleInputKeyDown(e);
    expect(onKeyDown).toBeCalledWith(e);
    expect(component.instance().applyAktiveKey).not.toBeCalled();
  });

  it('should have correct behavior when press key "up"', () => {
    AutoComplete.prototype.focusItem = jest.fn();
    AutoComplete.prototype.applyAktiveKey = jest.fn();

    const onKeyDown = jest.fn();
    const e = {
      keyCode: 38,
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
        <AutoCompleteItem
          value="value"
        >
          item
        </AutoCompleteItem>
        <AutoCompleteItem
          value="value"
        >
          item
        </AutoCompleteItem>
      </AutoComplete>
    );

    component.instance().setState({ activeKey: 2 });
    component.instance().handleInputKeyDown(e);
    expect(onKeyDown).not.toBeCalled();
    expect(component.instance().focusItem).toBeCalledWith(e, 1);
    expect(component.instance().applyAktiveKey).not.toBeCalled();

    component.instance().setState({ activeKey: 1 });
    component.instance().handleInputKeyDown(e);
    expect(component.instance().focusItem).toBeCalledWith(e, 0);

    component.instance().setState({ activeKey: 0 });
    component.instance().handleInputKeyDown(e);
    expect(component.instance().focusItem).toBeCalledWith(e, 0);
  });

  it('should have correct behavior when press key "elser"', () => {
    AutoComplete.prototype.focusItem = jest.fn();
    AutoComplete.prototype.applyAktiveKey = jest.fn();
    const onKeyDown = jest.fn();
    const e = {
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

    component.instance().handleInputKeyDown(e);
    expect(onKeyDown).not.toBeCalled();
    expect(component.instance().focusItem).not.toBeCalled();
    expect(component.instance().applyAktiveKey).toBeCalledWith(e);
  });

  it('should have correct behavior when press key "esc"', () => {
    AutoComplete.prototype.focusItem = jest.fn();
    AutoComplete.prototype.applyAktiveKey = jest.fn();
    const onKeyDown = jest.fn();
    const e = {
      keyCode: 27,
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

    component.instance().handleInputKeyDown(e);
    expect(onKeyDown).not.toBeCalled();
    expect(component.instance().focusItem).not.toBeCalled();
    expect(component.instance().applyAktiveKey).toBeCalledWith(e);
  });
});
