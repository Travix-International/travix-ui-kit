
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import { getClassNamesWithMods, getDataAttributes, warnAboutDeprecatedProp } from '../_helpers';

/**
 * Checkbox component.
 */
function Checkbox(props) {
  warnAboutDeprecatedProp(props.mods, 'mods', 'className');

  const {
    checked,
    children,
    className,
    dataAttrs = {},
    disabled,
    name,
    onChange,
  } = props;
  const dataAttributes = getDataAttributes(dataAttrs);
  const mods = props.mods ? props.mods.slice() : [];
  disabled && mods.push('is-disabled');
  const classNames = classnames(getClassNamesWithMods('ui-checkbox', mods), className);

  return (
    <label
      {...dataAttributes}
      className={classNames}
      htmlFor={name}
    >
      <input
        aria-checked={checked}
        checked={checked}
        disabled={disabled}
        id={name}
        onChange={onChange}
        readOnly={!onChange}
        role="radio"
        type="checkbox"
      />
      <span className="ui-checkbox__text">
        {children}
      </span>
    </label>
  );
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  name: '',
};

Checkbox.propTypes = {
  /**
   * Represents the state of the checkbox.
   */
  checked: PropTypes.bool,

  /**
   * Checkbox label.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),

  /**
   * Attribute used to set specific classes
   */
  className: PropTypes.string,

  /**
   * Data attribute. You can use it to set up any custom data-* attribute.
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),

  /**
   * Current activity state of the checkbox.
   */
  disabled: PropTypes.bool,

  /**
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),

  /**
   * Represents the element's name.
   */
  name: PropTypes.string.isRequired,

  /**
   * Represents the callback for onChange event.
   */
  onChange: PropTypes.func,
};

export default Checkbox;
