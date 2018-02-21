import { shallow } from 'enzyme';
import React from 'react';
import AutoCompleteItem from '../../../components/autoComplete/autoCompleteItem';

describe('AutoCompleteItem', () => {
  describe('#render()', () => {
    it('should render correct autocomplete item', () => {
      const wrapper = shallow(
        <AutoCompleteItem
          className="test-auto-complete-item"
          value="value"
        >
          item
        </AutoCompleteItem>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should not modify mods', () => {
      const mods = ['test'];
      const wrapper = shallow(
        <AutoCompleteItem
          mods={mods}
          value="value"
        >
          item
        </AutoCompleteItem>
      );
      expect(mods.length).toEqual(1);
      expect(mods[0]).toEqual('test');
      expect(wrapper).toMatchSnapshot();
    });

    it('should render autocomplete item with title mode', () => {
      const wrapper = shallow(
        <AutoCompleteItem
          isTitle
          value="value"
        >
          item
        </AutoCompleteItem>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render autocomplete item with active mode', () => {
      const wrapper = shallow(
        <AutoCompleteItem
          isActive
          value="value"
        >
          item
        </AutoCompleteItem>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
