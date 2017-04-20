import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../../../components/autoComplete/autoComplete';
import AutoCompleteItem from '../../../components/autoComplete/autoCompleteItem';

describe('AutoComplete: change', () => {
  it('should call passed onChange handler with correct data', () => {
    const onChange = jest.fn();
    const data = { value: 1 };

    const component = shallow(
      <AutoComplete
        name="autocomplete"
        onChange={onChange}
      >
        <AutoCompleteItem
          value="value"
        >
          item
        </AutoCompleteItem>
      </AutoComplete>
    );

    component.instance().change(data);
    expect(onChange).toBeCalledWith(data);
  });

  it('should not call passed onChange if onChange is not a function', () => {
    const onChange = jest.fn();
    const data = { value: 1 };

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

    component.instance().change(data);
    expect(onChange).not.toBeCalled();
  });
});
