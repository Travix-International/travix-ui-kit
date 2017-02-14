import * as enzyme from 'enzyme';
import * as enzymeToJson from 'enzyme-to-json';
import React from 'react';
import List from '../../../components/list/list';

describe('List', () => {
  describe('#render()', () => {
    const shallow = enzyme.shallow;
    const shallowToJson = enzymeToJson.shallowToJson;

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <List items={['London', 'Amsterdam', 'Madrid']} orientation="vertical" />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <List items={['London', 'Amsterdam', 'Madrid']} orientation="horizontal" />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <List hideBullets items={['London', 'Amsterdam', 'Madrid']} orientation="vertical" />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
