import * as enzyme from 'enzyme';
import * as enzymeToJson from 'enzyme-to-json';
import React from 'react';
import Button from '../../../components/button/button';

describe('Button', () => {
  describe('#render()', () => {
    const shallow = enzyme.shallow;
    const shallowToJson = enzymeToJson.shallowToJson;
    const onClickSpy = () => {};

    it('should render disabled link', () => {
      const wrapper = shallow(
        <Button disabled href="http://google.com" size="xs" type="link">Extra small</Button>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods #1', () => {
      const wrapper = shallow(
        <Button disabled size="xs" type="link">Extra small</Button>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should return noscript if no onClick provided', () => {
      const wrapper = shallow(
        <Button>Extra small</Button>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should not modify mods', () => {
      const mods = ['test'];
      const wrapper = shallow(
        <Button
          mods={mods}
          onClick={onClickSpy}
        >
          Button
        </Button>
      );

      expect(mods.length).toEqual(1);
      expect(mods[0]).toEqual('test');
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods #2', () => {
      const wrapper = shallow(
        <Button dataAttrs={{ gtm: 'id' }} size="xs" type="submit">Extra small</Button>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods #3', () => {
      const wrapper = shallow(
        <Button onClick={onClickSpy} size="xs" type="button">Extra small</Button>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render gtm data attribute', () => {
      const wrapper = shallow(
        <Button dataAttrs={{ gtm: 'id' }} onClick={onClickSpy}>Extra small</Button>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods without data-attrs', () => {
      const wrapper = shallow(
        <Button onClick={onClickSpy} type="button">Extra small</Button>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render ghost variation', () => {
      const wrapper = shallow(
        <Button onClick={onClickSpy} type="button" variation="ghost">Ghost</Button>
      );

      expect(wrapper.find('.ui-button').hasClass('ui-button_variation_ghost')).toEqual(true);
    });
  });
});
