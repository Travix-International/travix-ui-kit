import React from 'react';
import { shallow } from 'enzyme';
import AutoComplete from '../autoComplete';
import AutoCompleteItem from '../autoCompleteItem/AutoCompleteItem';

describe('AutoComplete: handleInputBlur', () => {
  it('should call passed onBlur and applyActiveKey handler with correct data', () => {
    AutoComplete.prototype.applyActiveKey = jest.fn();
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
    expect(component.instance().applyActiveKey).toBeCalledWith(e);
  });

  it('should not call passed methods when list not open or onBlur is not a function', () => {
    AutoComplete.prototype.applyActiveKey = jest.fn();
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
    expect(component.instance().applyActiveKey).not.toBeCalled();
  });
});
