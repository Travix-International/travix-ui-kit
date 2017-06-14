import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import Badge from '../../../components/badge/badge';

describe('Badge', () => {
  describe('#render()', () => {
    it('should render children', () => {
      const wrapper = shallow(
        <Badge title="Badge title">
          Badge Content
        </Badge>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should not render wrapper if children is not provided', () => {
      const wrapper = shallow(
        <Badge title="Badge title" />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
