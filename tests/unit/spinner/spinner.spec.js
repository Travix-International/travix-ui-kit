import { shallow } from 'enzyme';
import React from 'react';
import Spinner from '../../../components/spinner/spinner';

describe('Spinner', () => {
  describe('#render()', () => {
    it('should return spinner with class name according passed size', () => {
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
