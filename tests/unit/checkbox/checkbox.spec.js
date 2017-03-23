import * as enzyme from 'enzyme';
import * as enzymeToJson from 'enzyme-to-json';
import React from 'react';
import Checkbox from '../../../components/checkbox/checkbox';

describe('Checkbox', () => {
  describe('#render()', () => {
    const shallow = enzyme.shallow;
    const shallowToJson = enzymeToJson.shallowToJson;
    const onChange = () => {};

    it('should render disabled checkbox', () => {
      const wrapper = shallow(
        <Checkbox
          disabled
          name="disabled"
          onChange={onChange}
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render checked checkbox', () => {
      const wrapper = shallow(
        <Checkbox
          checked
          name="checked"
          onChange={onChange}
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render checkbox', () => {
      const wrapper = shallow(
        <Checkbox
          name="checkbox"
          onChange={onChange}
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
