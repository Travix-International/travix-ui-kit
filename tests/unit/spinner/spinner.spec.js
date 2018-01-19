import { shallow } from 'enzyme';
import React from 'react';
import Spinner from '../../../components/spinner/spinner';

describe('Spinner', () => {
  describe('#render()', () => {
    it('should not modify mods', () => {
      const mods = ['test'];
      const wrapper = shallow(
        <Spinner mods={mods} size="xs">Extra small</Spinner>
      );

      expect(mods.length).toEqual(1);
      expect(mods[0]).toEqual('test');
      expect(wrapper).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <Spinner size="xs">Extra small</Spinner>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <Spinner>Medium/Default</Spinner>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should handle custom className passed to the wrapper', () => {
      const wrapper = shallow(
        <Spinner wrapperClassName="my-custom-class">
          Testing custom class...
        </Spinner>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should return just normal spinner without children & use default props', () => {
      const wrapper = shallow(
        <Spinner />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should return wrapper if using with children & add handle transparency', () => {
      const wrapper = shallow(
        <Spinner transparent>
          Some content
        </Spinner>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should properly handle loading mode', () => {
      const wrapper = shallow(
        <Spinner loading>
          Some content
        </Spinner>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should handle non-loading mode', () => {
      const wrapper = shallow(
        <Spinner loading={false}>
          Some content
        </Spinner>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
