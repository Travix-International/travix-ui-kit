import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../../../components/autoComplete/autoComplete';
import AutoCompleteItem from '../../../components/autoComplete/autoCompleteItem';

describe('AutoComplete: handleItemMouseDown', () => {
  it('should call passed preventDefault', () => {
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

    component.instance().handleItemMouseDown(e);
    expect(e.preventDefault).toBeCalled();
  });
});
