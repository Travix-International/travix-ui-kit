import React from 'react';
import { shallow } from 'enzyme';
import AutoCompleteItem from '../autoCompleteItem';

describe('AutoCompleteItem: handleItemClick', () => {
  it('should call passed onClick handler if onClick is function', () => {
    AutoCompleteItem.prototype.getValue = jest.fn(() => 'result');
    const e = { target: {} };
    const onClick = jest.fn();

    const component = shallow(
      <AutoCompleteItem
        onClick={onClick}
        value="value"
      >
        item
      </AutoCompleteItem>
    );

    component.instance().handleItemClick(e);
    expect(onClick).toBeCalledWith(e, 'result');
  });

  it('should not call passed onClick handler if onClick is not a function', () => {
    const e = { target: {} };
    const onClick = jest.fn();

    const component = shallow(
      <AutoCompleteItem
        value="value"
      >
        item
      </AutoCompleteItem>
    );

    component.instance().handleItemClick(e);
    expect(onClick).not.toBeCalled();
  });
});
