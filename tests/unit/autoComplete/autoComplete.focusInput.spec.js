import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../../../components/autoComplete/autoComplete';
import AutoCompleteItem from '../../../components/autoComplete/autoCompleteItem';

describe('AutoComplete: focusInput', () => {
  it('should call passed focus method of input', () => {
    AutoComplete.prototype.input = {
      focus: jest.fn(),
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

    component.instance().focusInput();
    expect(component.instance().input.focus).toBeCalled();
  });

  it('should not call passed focus method of input if input not exist', () => {
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

    expect(component.instance().focusInput()).toEqual(undefined);
  });
});
