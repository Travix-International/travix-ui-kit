import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../autoComplete';
import AutoCompleteItem from '../autoCompleteItem/AutoCompleteItem';

describe('AutoComplete: focusItem', () => {
  it('should call preventDefault method amd undate state', () => {
    const e = {
      preventDefault: jest.fn(),
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

    component.instance().focusItem(e, 2);
    expect(e.preventDefault).toBeCalled();
    expect(component.instance().state.open).toEqual(true);
    expect(component.instance().state.activeKey).toEqual(2);
  });
});
