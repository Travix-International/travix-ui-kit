import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import Badge from '../../../components/badge/badge';

describe('Badge', () => {
  describe('#renderBadge()', () => {
    it('should render arrow-left', () => {
      const wrapper = shallow(
        <Badge arrow position="right" title="Badge title">
          Badge Content
        </Badge>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render arrow-right', () => {
      const wrapper = shallow(
        <Badge arrow position="left" title="Badge title" />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should ignore position if no content provided', () => {
      const wrapper = shallow(
        <Badge position="right" title="Badge title" />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
