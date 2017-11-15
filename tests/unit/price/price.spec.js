import { shallow } from 'enzyme';
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
      expect(ensureDecimalPrecision(undefined, 3)).toEqual('000');
    });
  });

  describe('#render()', () => {
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

      expect(wrapper).toMatchSnapshot();
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

      expect(wrapper).toMatchSnapshot();
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

      expect(wrapper).toMatchSnapshot();
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

      expect(wrapper).toMatchSnapshot();
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

      expect(wrapper).toMatchSnapshot();
    });

    it('should render asterisk when showAsterisk is true', () => {
      const wrapper = shallow(
        <Price
          decimalsSeparator=","
          showAsterisk
          thousandsSeparator="."
          underlined
          value={50153.30}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render with ui-price_size_xl class', () => {
      const wrapper = shallow(
        <Price
          size="xl"
          value={50153.30}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render with decimals when value is integer', () => {
      const wrapper = shallow(
        <Price value={50153} />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render with discount when value is integer not equal 0', () => {
      const wrapper = shallow(
        <Price
          discount={50200}
          value={50153}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render with additional text if it is non empty string', () => {
      const wrapper = shallow(
        <Price
          additionalText={'per day'}
          value={50153}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render with additional text block if it is a node', () => {
      const additionalText = (
        <div className="custom-class">
          <span> some important info about price! </span>
        </div>
      );

      const wrapper = shallow(
        <Price
          additionalText={additionalText}
          value={50153}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should return null if value is null', () => {
      const wrapper = shallow(
        <Price
          additionalText={'per day'}
          value={null}
        />
      );

      expect(wrapper).toMatchSnapshot();
      expect(wrapper.html()).toEqual(null);
    });

    it('should return null if value is undefined', () => {
      const wrapper = shallow(
        <Price
          additionalText={'per day'}
          value={undefined}
        />
      );

      expect(wrapper).toMatchSnapshot();
      expect(wrapper.html()).toEqual(null);
    });
  });
});
