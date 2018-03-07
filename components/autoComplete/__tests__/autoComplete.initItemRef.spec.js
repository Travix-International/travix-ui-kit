import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../autoComplete';
import AutoCompleteItem from '../autoCompleteItem/AutoCompleteItem';

describe('Input: ref', () => {
  it('should determine ref for item', () => {
    const element = {};

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

    component.instance().initItemRef(0)(element);
    expect(component.instance().items[0]).toEqual(element);
  });
});
