import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../autoComplete';
import AutoCompleteItem from '../autoCompleteItem/AutoCompleteItem';

describe('AutoComplete: selectInput', () => {
  it('should call passed select method of input', () => {
    AutoComplete.prototype.input = {
      select: jest.fn(),
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

    component.instance().selectInput();
    expect(component.instance().input.select).toBeCalled();
  });

  it('should not call passed select method of input if input not exist', () => {
    AutoComplete.prototype.input = undefined;

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

    expect(component.instance().selectInput()).toEqual(undefined);
  });
});
