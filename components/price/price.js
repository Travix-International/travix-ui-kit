// Imports
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
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
function Price(props) {
  const {
    additionalText,
    className,
    dataAttrs = {},
    decimalsPrecision,
    decimalsSeparator,
    discount,
    showAsterisk,
    showDecimals,
    size,
    symbol,
    symbolPosition,
    thousandsSeparator,
    underlined,
    unstyled,
    value,
  } = props;

  if (!value && value !== 0) {
    return null;
  }

  const mods = props.mods ? props.mods.slice() : [];

  const rootClass = 'ui-price';

  const [intValue, decValue] = value.toString().split('.');

  if (unstyled) {
    const priceFormatted = [
      addThousandsSeparator(intValue, thousandsSeparator),
      showDecimals && ensureDecimalPrecision(decValue, decimalsPrecision),
    ].filter(i => i !== false).join(decimalsSeparator);

    const unstyledValue = [
      symbolPosition === 'left' && symbol,
      priceFormatted,
      symbolPosition === 'right' && symbol,
      showAsterisk && '*',
    ].filter(i => i !== false).join(' ');

    return (
      <span {...getDataAttributes(dataAttrs)}>
        {unstyledValue}
      </span>
    );
  }

  mods.push(`size_${size}`);

  const priceClasses = classnames(getClassNamesWithMods(rootClass, mods), className);

  const textBlock = additionalText
    ? (
      <div className={`${rootClass}__additional-text-block`}>
        {additionalText}
      </div>
    )
    : null;

  let discountBlock = null;

  if (discount) {
    const [intDiscountValue, decDiscountValue] = discount.toString().split('.');
    const discountValue = addThousandsSeparator(intDiscountValue, thousandsSeparator)
      + decimalsSeparator
      + ensureDecimalPrecision(decDiscountValue, decimalsPrecision);

    discountBlock = (
      <div className={`${rootClass}__discount`}>
        {discountValue}
      </div>
    );
  }

  const decimalsMarkup = showDecimals
    ? (
      <div className={`${rootClass}__decimals`}>
        {decimalsSeparator + ensureDecimalPrecision(decValue, decimalsPrecision)}
      </div>
    )
    : null;

  const asterisk = showAsterisk
    ? (<div className={`${rootClass}__asterisk`}>*</div>)
    : null;

  const underlineMarkup = underlined
    ? <div className={`${rootClass}__underline`}/>
    : null;

  return (
    <div className={priceClasses} {...getDataAttributes(dataAttrs)}>
      {discountBlock}
      <div className={`${rootClass}__value-delimiter`}>
        <div className={`${rootClass}__currency ${rootClass}__currency_${symbolPosition}`}>{symbol}</div>
        <div className={`${rootClass}__integers`}>{addThousandsSeparator(intValue, thousandsSeparator)}</div>
        {decimalsMarkup}
        {asterisk}
      </div>
      {underlineMarkup}
      {textBlock}
    </div>
  );
}

Price.defaultProps = {
  additionalText: '',
  decimalsPrecision: 2,
  decimalsSeparator: '.',
  discount: 0,
  showAsterisk: false,
  showDecimals: true,
  size: 'l',
  symbol: '€',
  symbolPosition: 'left',
  thousandsSeparator: ',',
  underlined: false,
  unstyled: false,
};

Price.propTypes = {
  /**
   * Additional text that will be displayed under price and the line.
   * E.g.: 'per day'.
   */
  additionalText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Custom className(s) to be concatenated with the default ones on the component's root element
   */
  className: PropTypes.string,

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
   * Discount block. Strikethrough text with original price.
   */
  discount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),

  /**
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),

  /**
   * Defines if it should show the asterisk or not.
   */
  showAsterisk: PropTypes.bool,

  /**
   * Defines if it should show the decimals or not.
   */
  showDecimals: PropTypes.bool,

  /**
   * Price's size
   */
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),

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
   * Flag defining if the price should be rendered without any styles.
   */
  unstyled: PropTypes.bool,

  /**
   * Price to be displayed.
   */
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default Price;
