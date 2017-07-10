import * as enzyme from 'enzyme';
import * as enzymeToJson from 'enzyme-to-json';
import React from 'react';
import DatePicker from '../../../components/datePicker/datePicker';

describe('DatePicker', () => {
  describe('#render()', () => {
    const shallow = enzyme.shallow;
    const shallowToJson = enzymeToJson.shallowToJson;
    const onChange = () => {};
    const valueFormatterFn = jest.fn();

    it('should render disabled DatePicker', () => {
      const wrapper = shallow(
        <DatePicker
          disabled
          name="date-picker"
          onChange={onChange}
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render DatePicker with label', () => {
      const wrapper = shallow(
        <DatePicker
          label="label"
          name="date-picker"
          onChange={onChange}
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render correct DatePicker with value', () => {
      const wrapper = shallow(
        <DatePicker
          name="date-picker"
          onChange={onChange}
          value="2017-03-20"
          valueFormatterFn={valueFormatterFn}
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render open DatePicker', () => {
      const wrapper = shallow(
        <DatePicker
          name="date-picker"
          open
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
