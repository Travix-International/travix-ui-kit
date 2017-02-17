import * as enzyme from 'enzyme';
import * as enzymeToJson from 'enzyme-to-json';
import React from 'react';
import Price from '../../../components/price/price';

describe('Button', () => {
  describe('#render()', () => {
    const shallow = enzyme.shallow;
    const shallowToJson = enzymeToJson.shallowToJson;

    it('should return base class with mods for strings as class and string as mods', () => {
      const dataAttrs = {
        'gtm-id': 'test',
      };

      const wrapper = shallow(
        <Price
          dataAttrs={dataAttrs}
          decimalsSeparator=","
          mods={['my-special-class']}
          symbol="د.إ.‏"
          symbolPosition="right"
          thousandsSeparator="."
          underlined
          value={50153.30}
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should not render underline when underlined flag is missing', () => {
      const dataAttrs = {
        'gtm-id': 'test',
      };

      const wrapper = shallow(
        <Price
          dataAttrs={dataAttrs}
          decimalsSeparator=","
          mods={['my-special-class']}
          symbol="د.إ.‏"
          symbolPosition="right"
          thousandsSeparator="."
          value={50153.30}
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render only the amount of decimals defined in the decimalsPrecision', () => {
      const wrapper = shallow(
        <Price
          decimalsSeparator=","
          symbol="د.إ.‏"
          symbolPosition="right"
          thousandsSeparator="."
          value={50153.30121212121}
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render without thousands separator when overriden to empty string', () => {
      const wrapper = shallow(
        <Price
          decimalsSeparator=","
          symbol="د.إ.‏"
          symbolPosition="right"
          thousandsSeparator=""
          value={50153.30}
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
