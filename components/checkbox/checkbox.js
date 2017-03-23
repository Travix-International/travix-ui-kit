import React, { PropTypes } from 'react';
import { getClassNamesWithMods } from '../_helpers';

/**
 * Checkbox component.
 */
function Checkbox({
  checked,
  children,
  disabled,
  inputAttr,
  labelAttr,
  mods = [],
  name,
  onChange,
}) {
  disabled && mods.push('is-disabled');
  const className = getClassNamesWithMods('ui-checkbox', mods);

  return (
    <label className={className} htmlFor={name} {...labelAttr}>
      <input
        {...inputAttr}
        aria-checked={checked}
        checked={checked}
        disabled={disabled}
        id={name}
        onChange={onChange}
        role="radio"
        type="checkbox"
      />
      <span className="ui-checkbox__text" />
      {children}
    </label>
  );
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  inputAttr: {},
  labelAttr: {},
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
   * Current activity state of the checkbox.
   */
  disabled: PropTypes.bool,

  /**
   * You can use it to set up any custom attribute for input.
   */
  inputAttr: PropTypes.object,

  /**
   * You can use it to set up any custom attribute for label.
   */
  labelAttr: PropTypes.object,

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
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
