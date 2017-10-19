import { shallow } from 'enzyme';
import React from 'react';
import ToggleButton from '../../../components/toggleButton/toggleButton';

describe('ToggleButton', () => {
  it('renders noscript when no items are provided to ToggleButton', () => {
    const wrapper = shallow(<ToggleButton />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the ToggleButton component with the defaults', () => {
    const items = [
      'First item',
      'Second item',
      'Third item',
    ];
    const wrapper = shallow(<ToggleButton items={items} />);

    const selectedItem = wrapper.find('.ui-toggle-button__item_active');

    expect(wrapper).toMatchSnapshot();
    expect(selectedItem.text()).toEqual(items[0]);
  });

  it('passing a value in selectedIndex will select the proper index of the list of items', () => {
    const items = [
      'First item',
      'Second item',
      'Third item',
    ];
    const fakeEvent = { stopPropagation: jest.fn() };
    const wrapper = shallow(<ToggleButton items={items} selectedIndex={2} />);
    const selectedItem = wrapper.find('.ui-toggle-button__item_active');

    expect(wrapper).toMatchSnapshot();
    expect(selectedItem.text()).toEqual(items[2]);

    wrapper.find('.ui-toggle-button__item').at(0).simulate('click', fakeEvent);
    expect(fakeEvent.stopPropagation).toHaveBeenCalledTimes(1);
  });

  it('when a "handleSelect" function is passed it gets executed when clicking on an option', () => {
    const items = [
      'First item',
      'Second item',
      'Third item',
    ];

    const mockedHandleSelect = jest.fn();
    const fakeEvent = { stopPropagation: jest.fn() };

    const wrapper = shallow(<ToggleButton handleSelect={mockedHandleSelect} items={items} />);

    wrapper.find('.ui-toggle-button__item').at(0).simulate('click', fakeEvent);

    expect(wrapper).toMatchSnapshot();
    expect(fakeEvent.stopPropagation).toHaveBeenCalledTimes(1);
    expect(mockedHandleSelect).toHaveBeenCalledTimes(1);
    expect(mockedHandleSelect).toBeCalledWith(fakeEvent, 0);
  });
});
