// Imports
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

/**
 * General Button component. Use when you need button or a link that looks like button
 */
function Button(props) {
  const {
    children,
    className,
    dataAttrs = {},
    disabled,
    href,
    id,
    onClick,
    size,
    type,
    variation,
  } = props;
  const restProps = getDataAttributes(dataAttrs);
  const mods = props.mods ? props.mods.slice() : [];

  /** This props have default values */
  mods.push(`size_${size}`);
  mods.push(`variation_${variation}`);

  if (disabled) {
    mods.push(`disabled_true`);
  }

  const classes = classnames(
    getClassNamesWithMods('ui-button', mods),
    className
  );

  if (type === 'link') {
    if (!href) {
      console.warn('Missing href'); // eslint-disable-line no-console
      return null;
    }

    return (
      <a
        {...restProps}
        className={classes}
        href={href}
        id={id}
      >
        {children}
      </a>
    );
  }

  if (type === 'submit' || type === 'reset') {
    return (
      <button
        {...restProps}
        className={classes}
        disabled={disabled}
        id={id}
        type={type}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      {...restProps}
      className={classes}
      disabled={disabled}
      id={id}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
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
   * Attribute used to set specific classes which will be combined
   * with the "ui-button" class + mods.
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
   * Current activity state of button.
   */
  disabled: PropTypes.bool,
  /**
   * This field will be used for link buttons.
   */
  href: PropTypes.string,

  /**
   * Attribute used to set specific id
   */
  id: PropTypes.string,

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
  variation: PropTypes.oneOf(['default', 'ghost', 'ghost-inverted', 'link']),
};

export default Button;
