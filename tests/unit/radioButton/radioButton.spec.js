import * as enzyme from 'enzyme';
import * as enzymeToJson from 'enzyme-to-json';
import React from 'react';
import RadioButton from '../../../components/radioButton/radioButton';

describe('Radio Button', () => {
  describe('#render()', () => {
    const shallow = enzyme.shallow;
    const shallowToJson = enzymeToJson.shallowToJson;
    const onChange = () => {};

    it('should render disabled radio button', () => {
      const wrapper = shallow(
        <RadioButton disabled id="disabledRadio" onChange={onChange}>
          Disabled radio button
        </RadioButton>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render checked radio button', () => {
      const wrapper = shallow(
        <RadioButton checked id="radio1" onChange={onChange}>
          Radio 1
        </RadioButton>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render radio button', () => {
      const wrapper = shallow(
        <RadioButton id="radio2" onChange={onChange}>
          Radio 2
        </RadioButton>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
