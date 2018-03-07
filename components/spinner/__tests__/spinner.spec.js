import { shallow } from 'enzyme';
import React from 'react';
import Spinner from '../spinner';

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

    it('should return spinner with class name according passed mods and size', () => {
      const wrapper = shallow(
        <Spinner size="xs">Extra small</Spinner>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should return spinner with class name according default size', () => {
      const wrapper = shallow(
        <Spinner>Medium/Default</Spinner>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should return spinner with custom class name', () => {
      const wrapper = shallow(
        <Spinner className="my-custom-class">Medium/Default</Spinner>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
