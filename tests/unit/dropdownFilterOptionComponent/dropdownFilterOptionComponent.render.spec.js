import { shallow } from 'enzyme';
import React from 'react';
import DropdownFilterOptionComponent from '../../../components/dropDown/dropdownFilterOptionComponent';

describe('dropdownFilterOptionComponent', () => {
  describe('#render()', () => {
    it('should render filter option', () => {
      const option = {
        label: 'Three',
        value: '3',
      };

      const onSelect = jest.fn();
      const children = 'Three';

      const wrapper = shallow(
        <DropdownFilterOptionComponent
          onSelect={onSelect}
          option={option}
        >
          {children}
        </DropdownFilterOptionComponent>
      );

      expect(onSelect).not.toBeCalled();
      expect(wrapper).toMatchSnapshot();
    });

    it('should render disabled and checked filter option', () => {
      const option = {
        label: 'Three',
        value: '3',
        disabled: true,
        checked: true,
      };

      const onSelect = jest.fn();
      const children = 'Three';

      const wrapper = shallow(
        <DropdownFilterOptionComponent
          onSelect={onSelect}
          option={option}
        >
          {children}
        </DropdownFilterOptionComponent>
      );

      expect(onSelect).not.toBeCalled();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
