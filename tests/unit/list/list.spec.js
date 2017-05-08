import * as enzyme from 'enzyme';
import * as enzymeToJson from 'enzyme-to-json';
import React from 'react';
import List from '../../../components/list/list';

describe('List', () => {
  describe('#render()', () => {
    const shallow = enzyme.shallow;
    const shallowToJson = enzymeToJson.shallowToJson;

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
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <List align="vertical" items={['London', 'Amsterdam', 'Madrid']} />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <List align="horizontal" items={['London', 'Amsterdam', 'Madrid']} />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <List align="vertical" hideBullets items={['London', 'Amsterdam', 'Madrid']} />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
