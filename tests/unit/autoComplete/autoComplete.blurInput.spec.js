import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../../../components/autoComplete/autoComplete';
import AutoCompleteItem from '../../../components/autoComplete/autoCompleteItem';

describe('AutoComplete: blurInput', () => {
  it('should call passed blur method of input', () => {
    AutoComplete.prototype.input = {
      blur: jest.fn(),
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

    component.instance().blurInput();
    expect(component.instance().input.blur).toBeCalled();
  });

  it('should not call passed blur method of input if input not exist', () => {
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

    expect(component.instance().blurInput()).toEqual(undefined);
  });
});
