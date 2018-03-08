import { shallow } from 'enzyme';
import React from 'react';
import DropDown from '../dropDown';

describe('DropDown: onChange', () => {
  it('should call passed onChange handler with passed option if filterMode is false', () => {
    const onChange = jest.fn();
    const options = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
    ];
    const changedOption = options[0];

    const component = shallow(
      <DropDown
        onChange={onChange}
        options={options}
      />
    );
    expect(onChange).not.toBeCalled();
    component.instance().onChange(changedOption);
    expect(onChange).toBeCalledWith(changedOption);
  });

  it('should call passed onChange handler with passed options if filterMode is true', () => {
    const onChange = jest.fn();
    const options = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
      { label: 'Two', value: 3 },
    ];

    const changedOptions = [
      options[0],
      options[1],
    ];
    const option = changedOptions[0];
    const optionIndex = 0;
    const filterKey = 'key';

    const component = shallow(
      <DropDown
        filterKey={filterKey}
        filterMode
        onChange={onChange}
        options={options}
      />
    );
    expect(onChange).not.toBeCalled();
    component.instance().onChange(changedOptions);
    expect(onChange).toBeCalledWith(option, optionIndex, filterKey);
  });
});
