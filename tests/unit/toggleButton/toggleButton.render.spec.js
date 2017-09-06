import * as enzyme from 'enzyme';
import * as enzymeToJson from 'enzyme-to-json';
import React from 'react';
import ToggleButton from '../../../components/toggleButton/toggleButton';

describe('ToggleButton', () => {
  describe('#render()', () => {
    const shallow = enzyme.shallow;
    const shallowToJson = enzymeToJson.shallowToJson;

    it('should render correct toggleButton component', () => {
      const mods = ['test-test'];
      const wrapper = shallow(
        <ToggleButton
          handleSelect={() => {}}
          items={['Upper deck', 'Lower deck']}
          mods={mods}
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should not render correct toggleButton component', () => {
      const mods = ['test-test'];
      const wrapper = shallow(
        <ToggleButton
          handleSelect={() => {}}
          items={['Upper deck']}
          mods={mods}
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
