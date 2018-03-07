import React from 'react';
import { shallow } from 'enzyme';
import AutoCompleteItem from '../autoCompleteItem';

describe('AutoCompleteItem: getValue', () => {
  it('should return correct value', () => {
    const component = shallow(
      <AutoCompleteItem
        index={1}
        value="value"
      >
        item
      </AutoCompleteItem>
    );

    component.instance().getValue();
    expect(component.instance().getValue())
      .toEqual({
        index: 1,
        value: 'value',
      });
  });

  it('should return correct value with code', () => {
    const component = shallow(
      <AutoCompleteItem
        code="code"
        index={1}
        value="value"
      >
        item
      </AutoCompleteItem>
    );

    component.instance().getValue();
    expect(component.instance().getValue())
      .toEqual({
        code: 'code',
        index: 1,
        value: 'value',
      });
  });
});
