import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../../../components/autoComplete/autoComplete';
import AutoCompleteItem from '../../../components/autoComplete/autoCompleteItem';

describe('AutoComplete: handleInputBlur', () => {
  it('should call passed onBlur and applyAktiveKey handler with correct data', () => {
    AutoComplete.prototype.applyAktiveKey = jest.fn();
    const onBlur = jest.fn();
    const e = { target: {} };

    const component = shallow(
      <AutoComplete
        name="autocomplete"
        onBlur={onBlur}
      >
        <AutoCompleteItem
          value="value"
        >
          item
        </AutoCompleteItem>
      </AutoComplete>
    );

    component.instance().setState({ open: true });
    component.instance().handleInputBlur(e);
    expect(onBlur).toBeCalledWith(e);
    expect(component.instance().applyAktiveKey).toBeCalledWith(e);
  });

  it('should not call passed methods when list not open or onBlur is not a function', () => {
    AutoComplete.prototype.applyAktiveKey = jest.fn();
    const onBlur = jest.fn();
    const e = { target: {} };

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

    component.instance().handleInputBlur(e);
    expect(onBlur).not.toBeCalled();
    expect(component.instance().applyAktiveKey).not.toBeCalled();
  });
});
