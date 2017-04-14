// Imports
import React, { PropTypes } from 'react';
import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

/**
 * Adds the thousands separator to a given value.
 * If either the thousands separator is not set or the value doesn't have thousands,
 * it will return the original value.
 *
 * @function addThousandsSeparator
 * @param {String} value              String to be formatted
 * @param {String} thousandsSeparator Character to be used to split the thousands unit.
 * @return {String}                   Either the original value or the formatted value.
 */
export function addThousandsSeparator(value, thousandsSeparator) {
  if (!thousandsSeparator || (value.length <= 3)) {
    return value;
  }

  return value.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
}

/**
 * Ensures that a decimal value has the right decimal precision (no rounding applied).
 *
 * @function ensureDecimalPrecision
 * @param {String} value              String representing the decimal part of a number.
 * @param {Number} decimalsPrecision  Number of decimals to be allowed.
 * @return {String}                   The value with a proper precision.
 */
export function ensureDecimalPrecision(value = '', decimalsPrecision = 2) {
  if (value.length > decimalsPrecision) {
    return value.substr(0, decimalsPrecision);
  }

  return `${value}${'0'.repeat(decimalsPrecision - value.length)}`;
}

/**
 * Price component
 */
function Price({
  dataAttrs = {},
  decimalsPrecision,
  decimalsSeparator,
  mods = [],
  showDecimals,
  size,
  symbol,
  symbolPosition,
  thousandsSeparator,
  underlined,
  value,
}) {
  const rootClass = 'ui-price';
  const [intValue, decValue] = value.toString().split('.');

  mods.push(`size_${size}`);

  const className = getClassNamesWithMods(rootClass, mods);

  const decimalsMarkup = showDecimals
    ? (
      <div className={`${rootClass}__decimals`}>
        {decimalsSeparator + ensureDecimalPrecision(decValue, decimalsPrecision)}
      </div>
      )
    : null;

  const underlineMarkup = underlined
    ? <div className={`${rootClass}__underline`}/>
    : null;

  return (
    <div className={className} {...getDataAttributes(dataAttrs)}>
      <div className={`${rootClass}__value-delimiter`}>
        <div className={`${rootClass}__currency ${rootClass}__currency_${symbolPosition}`}>{symbol}</div>
        <div className={`${rootClass}__integers`}>{addThousandsSeparator(intValue, thousandsSeparator)}</div>
        {decimalsMarkup}
      </div>
      {underlineMarkup}
    </div>
  );
}

Price.defaultProps = {
  decimalsPrecision: 2,
  decimalsSeparator: '.',
  showDecimals: true,
  size: 'l',
  symbol: '€',
  symbolPosition: 'left',
  thousandsSeparator: ',',
  underlined: false,
};

Price.propTypes = {
  /**
   * Data attribute. You can use it to set up GTM key or any custom data-* attribute
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),

  /**
   * Decimals precision. Max number of decimals.
   */
  decimalsPrecision: PropTypes.number,

  /**
   * Decimals separator. When formatting the number it will split decimals from integers.
   */
  decimalsSeparator: PropTypes.string,

  /**
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),

  /**
   * Defines if it should show the decimals or not.
   */
  showDecimals: PropTypes.bool,

  /**
   * Price's size
   */
  size: PropTypes.oneOf(['s', 'm', 'l', 'xl']),

  /**
   * Currency symbol. Defines the currency symbol of the Price.
   */
  symbol: PropTypes.string,

  /**
   * Currency symbol's position. Defines where the currency symbol is rendered on the Price.
   */
  symbolPosition: PropTypes.oneOf(['left', 'right']),

  /**
   * Thousands separator. When formatting the number it will split the thousands digits.
   */
  thousandsSeparator: PropTypes.string,

  /**
   * Flag defining if the price should be underlined.
   */
  underlined: PropTypes.bool,

  /**
   * Price to be displayed.
   */
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default Price;
