import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../../../components/autoComplete/autoComplete';
import AutoCompleteItem from '../../../components/autoComplete/autoCompleteItem';

describe('AutoComplete: updateInput', () => {
  it('should call passed onUpdateInput handler with correct data', () => {
    const onUpdateInput = jest.fn();
    const data = 123;

    const component = shallow(
      <AutoComplete
        name="autocomplete"
        onUpdateInput={onUpdateInput}
      >
        <AutoCompleteItem
          value="value"
        >
          item
        </AutoCompleteItem>
      </AutoComplete>
    );

    component.instance().updateInput(data);
    expect(onUpdateInput).toBeCalledWith(data);
  });

  it('should not call passed onUpdateInput if onUpdateInput is not a function', () => {
    const onUpdateInput = jest.fn();
    const data = 123;

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

    component.instance().updateInput(data);
    expect(onUpdateInput).not.toBeCalled();
  });
});
