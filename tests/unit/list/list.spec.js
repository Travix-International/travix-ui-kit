import { shallow } from 'enzyme';
import React from 'react';
import List from '../../../components/list/list';

describe('List', () => {
  describe('#render()', () => {
    it('should not modify mods', () => {
      const mods = ['test'];
      const wrapper = shallow(
        <List
          align="vertical"
          items={['London', 'Amsterdam', 'Madrid']}
          mods={mods}
        />
      );

      expect(mods.length).toEqual(1);
      expect(mods[0]).toEqual('test');
      expect(wrapper).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <List align="vertical" items={['London', 'Amsterdam', 'Madrid']} />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <List align="horizontal" items={['London', 'Amsterdam', 'Madrid']} />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <List align="vertical" hideBullets items={['London', 'Amsterdam', 'Madrid']} />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should not render empty items if an appropriate prop is false', () => {
      const wrapper = shallow(
        <List items={['London', '', 'Madrid', null]} renderEmptyItems={false} />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
