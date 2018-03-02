import { mount, shallow } from 'enzyme';
import React from 'react';
import ToggleButton from '../../../components/toggleButton/toggleButton';
import ToggleItem from '../../../components/toggleButton/toggleItem';

describe('ToggleButton', () => {
  it('renders null when no items or children are provided to ToggleButton', () => {
    const wrapper = shallow(<ToggleButton />);
    expect(wrapper.type()).toEqual(null);
  });

  it('renders the ToggleButton component with the defaults', () => {
    const items = [
      'First item',
      'Second item',
      'Third item',
    ];
    const wrapper = mount(<ToggleButton items={items} />);

    const selectedItem = wrapper.find('.ui-toggle-button__item_active');

    expect(wrapper).toMatchSnapshot();
    expect(selectedItem.text()).toEqual(items[0]);
  });

  it('renders the ToggleButton component using ToggleItems', () => {
    const wrapper = mount(
      <ToggleButton>
        <ToggleItem>First Item</ToggleItem>
        <ToggleItem>Second Item</ToggleItem>
        <ToggleItem>Third Item</ToggleItem>
      </ToggleButton>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('passing a value in selectedIndex will select the proper index of the list of items', () => {
    const items = [
      'First item',
      'Second item',
      'Third item',
    ];
    const fakeEvent = { stopPropagation: jest.fn() };
    const wrapper = mount(<ToggleButton items={items} selectedIndex={2} />);
    const selectedItem = wrapper.find('.ui-toggle-button__item_active');

    expect(wrapper).toMatchSnapshot();
    expect(selectedItem.text()).toEqual(items[2]);

    wrapper.find(ToggleItem).first().simulate('click', fakeEvent);
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

    const wrapper = mount(<ToggleButton handleSelect={mockedHandleSelect} items={items} />);
    wrapper.find(ToggleItem).first().simulate('click', fakeEvent);

    expect(wrapper).toMatchSnapshot();
    expect(fakeEvent.stopPropagation).toHaveBeenCalledTimes(1);
    expect(mockedHandleSelect).toHaveBeenCalledTimes(1);
  });
});
