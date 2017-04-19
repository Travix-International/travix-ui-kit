import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../../../components/autoComplete/autoComplete';
import AutoCompleteItem from '../../../components/autoComplete/autoCompleteItem';

describe('AutoComplete: handleInputChange', () => {
  it('should call passed updateInput handler with correct data', () => {
    AutoComplete.prototype.updateInput = jest.fn();
    const e = {
      stopPropagation: jest.fn(),
      target: {
        value: 'value',
      },
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

    component.instance().handleInputChange(e);
    expect(component.instance().state).toEqual({
      inputValue: 'value',
      open: true,
      activeKey: undefined,
    });
    expect(component.instance().updateInput).toBeCalledWith('value');
  });
});
