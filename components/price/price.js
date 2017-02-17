// Imports
import React from 'react';
import { getClassNamesWithMods } from '../_helpers';

const { PropTypes } = React;

/**
 * Price component
 */
function Price({
  dataAttrs = {},
  decimalsPrecision,
  decimalsSeparator,
  mods = [],
  symbol,
  symbolPosition,
  thousandsSeparator,
  underlined,
  value,
}) {
  const rootClass = 'ui-price';
  const className = getClassNamesWithMods(rootClass, mods);
  const [intValue, decValue] = value.toString().split('.');

  let formattedIntValue = intValue;
  if (thousandsSeparator && (formattedIntValue.length > 3)) {
    formattedIntValue = formattedIntValue
      .split('')
      .reverse()
      .reduce((ret, digit, idx) => ret.concat([((idx > 0) && ((idx % 3) === 0) ? thousandsSeparator : ''), digit]), [])
      .reverse()
      .join('');
  }

  const formattedDecValue = decValue.length > decimalsPrecision
    ? decValue.substr(0, decimalsPrecision)
    : `${decValue}${'0'.repeat(decimalsPrecision - decValue.length)}`;

  const dataAttributes = Object.keys(dataAttrs).reduce((ret, key) => {
    ret[`data-${key.toLowerCase()}`] = dataAttrs[key];
    return ret;
  }, {});
  const underlineMarkup = underlined ? <div className={`${rootClass}__underline`}/> : null;

  return (<div className={className} {...dataAttributes}>
    <div className={`${rootClass}__value-delimiter`}>
      <div className={`${rootClass}__currency ${rootClass}__currency-${symbolPosition}`}>{symbol}</div>
      <div className={`${rootClass}__integers`}>{formattedIntValue}</div>
      <div className={`${rootClass}__decimals`}>{decimalsSeparator}{formattedDecValue}</div>
    </div>
    {underlineMarkup}
  </div>);
}

Price.defaultProps = {
  decimalsPrecision: 2,
  decimalsSeparator: '.',
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
  value: PropTypes.number.isRequired,
};

export default Price;
