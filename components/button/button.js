// Imports
import React from 'react';
import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

const { PropTypes } = React;

/**
 * General Button component. Use when you need button or a link that looks like button
 */
function Button({ children, mods = [], size, href, onClick, type, variation, disabled, dataAttrs = {} }) {
  const restProps = getDataAttributes(dataAttrs);

  if (size) {
    mods.push(`size_${size}`);
  }

  if (variation) {
    mods.push(`variation_${variation}`);
  }

  if (disabled) {
    mods.push(`disabled_true`);
  }

  const className = getClassNamesWithMods('ui-button', mods);

  if (type === 'link') {
    if (!href) {
      console.warn('Missing href');
      return <noscript />;
    }

    return (
      <a className={className} href={href} {...restProps}>{children}</a>
    );
  }

  if (type === 'submit' || type === 'reset') {
    return (
      <button className={className} disabled={disabled} type={type} {...restProps}>{children}</button>
    );
  }

  if (!onClick) {
    console.warn('Missing onClick');
    return <noscript />;
  }

  return (
    <button className={className} disabled={disabled} onClick={onClick} type="button">{children}</button>
  );
}

Button.defaultProps = {
  disabled: false,
  size: 'm',
  type: 'button',
  variation: 'default',
};

Button.propTypes = {
  /**
   * Button's content.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,

  /**
   * Data attribute. You can use it to set up GTM key or any custom data-* attribute
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),

  /**
   * Current activity state of button.
   */
  disabled: PropTypes.bool,
  /**
   * This field will be used for link buttons.
   */
  href: PropTypes.string,

  /**
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),

  /**
   * The callback for onClick event. Using with default `type` or `type="button"`.
   */
  onClick: PropTypes.func,
  /**
   * Button size.
   */
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  /**
   * To define button's behavior.
   */
  type: PropTypes.oneOf(['button', 'link', 'submit', 'reset']),
  /**
   * Button's apperance.
   */
  variation: PropTypes.oneOf(['default', 'ghost', 'social', 'rounded', 'borderless']),
};

export default Button;
