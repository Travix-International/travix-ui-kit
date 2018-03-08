import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../autoComplete';
import AutoCompleteItem from '../autoCompleteItem/AutoCompleteItem';

describe('AutoComplete: close', () => {
  it('should call onClose method amd undate state', () => {
    const onClose = jest.fn();

    const component = shallow(
      <AutoComplete
        name="autocomplete"
        onClose={onClose}
      >
        <AutoCompleteItem
          value="value"
        >
          item
        </AutoCompleteItem>
      </AutoComplete>
    );

    component.instance().close();
    expect(component.instance().state.open).toEqual(false);
    expect(onClose).toBeCalled();
  });

  it('should not call onClose method if onClose in not a function', () => {
    const onClose = jest.fn();

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

    component.instance().close();
    expect(component.instance().state.open).toEqual(false);
    expect(onClose).not.toBeCalled();
  });
});
