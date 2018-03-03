import { mount, shallow } from 'enzyme';
import React from 'react';
import ToggleButton from '../../../components/toggleButton/toggleButton';
import ToggleItem from '../../../components/toggleButton/toggleItem';

describe('ToggleButton', () => {
  const defaultMockedHandleSelect = jest.fn();

  it('renders null when no items or children are provided to ToggleButton', () => {
    const wrapper = shallow(<ToggleButton handleSelect={defaultMockedHandleSelect} />);
    expect(wrapper.type()).toEqual(null);
  });

  it('renders the ToggleButton component using items', () => {
    const items = [
      'First item',
      'Second item',
      'Third item',
    ];
    const wrapper = mount(<ToggleButton handleSelect={defaultMockedHandleSelect} items={items} />);

    const selectedItem = wrapper.find('.ui-toggle-button__item_active');

    expect(wrapper).toMatchSnapshot();
    expect(selectedItem.text()).toEqual(items[0]);
  });

  it('renders the ToggleButton component with the defaults', () => {
    const wrapper = mount(
      <ToggleButton handleSelect={defaultMockedHandleSelect}>
        <ToggleItem>First Item</ToggleItem>
        <ToggleItem>Second Item</ToggleItem>
        <ToggleItem>Third Item</ToggleItem>
      </ToggleButton>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('passing a value in selectedIndex will select the proper index of the list of items', () => {
    const wrapper = mount(
      <ToggleButton handleSelect={defaultMockedHandleSelect} selectedIndex={2}>
        <ToggleItem>First Item</ToggleItem>
        <ToggleItem>Second Item</ToggleItem>
        <ToggleItem>Third Item</ToggleItem>
      </ToggleButton>
    );
    const selectedItem = wrapper.find('.ui-toggle-button__item_active');

    expect(wrapper).toMatchSnapshot();
    expect(selectedItem.text()).toEqual('Third Item');
  });

  it('when a "handleSelect" function is passed it gets executed when clicking on an option', () => {
    const wrapper = mount(
      <ToggleButton handleSelect={defaultMockedHandleSelect} selectedIndex={2}>
        <ToggleItem>First Item</ToggleItem>
        <ToggleItem>Second Item</ToggleItem>
        <ToggleItem>Third Item</ToggleItem>
      </ToggleButton>
    );

    const fakeEvent = { stopPropagation: jest.fn() };

    wrapper.find(ToggleItem).first().simulate('click', fakeEvent);

    expect(fakeEvent.stopPropagation).toHaveBeenCalledTimes(1);
    expect(defaultMockedHandleSelect).toHaveBeenCalledTimes(1);
  });
});
