import * as enzyme from 'enzyme';
import * as enzymeToJson from 'enzyme-to-json';
import React from 'react';
import Price, { addThousandsSeparator, ensureDecimalPrecision } from '../../../components/price/price';

describe('Price', () => {
  describe('#addThousandsSeparator', () => {
    it('returns original value when thousandsSeparator is undefined || value.length < 3', () => {
      expect(addThousandsSeparator('5000')).toEqual('5000');
      expect(addThousandsSeparator('500', '.')).toEqual('500');
    });

    it('returns value with given thousandsSeparator', () => {
      expect(addThousandsSeparator('5000', '.')).toEqual('5.000');
      expect(addThousandsSeparator('50000', '.')).toEqual('50.000');
      expect(addThousandsSeparator('50000', ' ')).toEqual('50 000');
      expect(addThousandsSeparator('5000000', ' ')).toEqual('5 000 000');
    });
  });

  describe('#ensureDecimalPrecision', () => {
    it('returns truncated value to decimalsPrecision number when value.length > decimalsPrecision', () => {
      expect(ensureDecimalPrecision('5000')).toEqual('50');
      expect(ensureDecimalPrecision('5000', 3)).toEqual('500');
    });

    it('returns value suffixed by 0s value.length < decimalsPrecision until matches decimalsPrecision length', () => {
      expect(ensureDecimalPrecision('5')).toEqual('50');
      expect(ensureDecimalPrecision('5', 3)).toEqual('500');
      expect(ensureDecimalPrecision('', 3)).toEqual('000');
    });
  });

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

    it('should render without decimals when showDecimals = false', () => {
      const wrapper = shallow(
        <Price
          decimalsSeparator=","
          mods={['my-special-class']}
          showDecimals={false}
          symbol="د.إ.‏"
          symbolPosition="right"
          thousandsSeparator="."
          underlined
          value={50153.30}
        />
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
