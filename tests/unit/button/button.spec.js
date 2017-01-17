import * as enzyme from 'enzyme';
import * as enzymeToJson from 'enzyme-to-json';
import React from 'react';
import Button from '../../../components/button/button';

describe('Button', () => {
  describe('#render()', () => {
    const shallow = enzyme.shallow;
    const shallowToJson = enzymeToJson.shallowToJson;
    const onClickSpy = () => {};

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <Button dataAttrs={{ gtm: 'id' }} disabled href="http://google.com" size="xs" type="link">Extra small</Button>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <Button dataAttrs={{ gtm: 'id' }} disabled size="xs" type="link">Extra small</Button>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <Button dataAttrs={{ gtm: 'id' }} size="xs">Extra small</Button>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <Button dataAttrs={{ gtm: 'id' }} size="xs" type="submit">Extra small</Button>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <Button dataAttrs={{ gtm: 'id' }} onClick={onClickSpy} size="xs" type="button">Extra small</Button>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
