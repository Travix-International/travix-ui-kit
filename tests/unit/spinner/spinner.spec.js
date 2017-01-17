import * as enzyme from 'enzyme';
import * as enzymeToJson from 'enzyme-to-json';
import React from 'react';
import Spinner from '../../../components/spinner/spinner';

describe('Spinner', () => {
  describe('#render()', () => {
    const shallow = enzyme.shallow;
    const shallowToJson = enzymeToJson.shallowToJson;

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <Spinner size="xs">Extra small</Spinner>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should return base class with mods for strings as class and string as mods', () => {
      const wrapper = shallow(
        <Spinner>Medium/Default</Spinner>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
