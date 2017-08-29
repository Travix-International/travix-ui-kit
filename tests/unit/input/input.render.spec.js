import * as enzyme from 'enzyme';
import * as enzymeToJson from 'enzyme-to-json';
import React from 'react';
import Input from '../../../components/input/input';

describe('Input', () => {
  describe('#render()', () => {
    const shallow = enzyme.shallow;
    const shallowToJson = enzymeToJson.shallowToJson;
    const onChange = () => {};

    it('should render correct input', () => {
      const wrapper = shallow(
        <Input
          disabled
          name="input"
          onChange={onChange}
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should not modify mods', () => {
      const mods = ['test'];
      const wrapper = shallow(
        <Input
          mods={mods}
        />
      );

      expect(mods.length).toEqual(1);
      expect(mods[0]).toEqual('test');
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render multiline input', () => {
      const wrapper = shallow(
        <Input
          disabled
          multiline
          name="input"
          onChange={onChange}
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render span for icon', () => {
      const wrapper = shallow(
        <Input
          name="input"
          onChange={onChange}
          status="error"
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
