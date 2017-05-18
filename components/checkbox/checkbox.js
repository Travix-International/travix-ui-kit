
import React, { PropTypes } from 'react';
import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

/**
 * Checkbox component.
 */
function Checkbox(props) {
  const {
    checked,
    children,
    dataAttrs = {},
    disabled,
    name,
    onChange,
  } = props;
  const dataAttributes = getDataAttributes(dataAttrs);
  const mods = props.mods ? props.mods.slice() : [];
  disabled && mods.push('is-disabled');
  const className = getClassNamesWithMods('ui-checkbox', mods);

  return (
    <label
      {...dataAttributes}
      className={className}
      htmlFor={name}
    >
      <input
        aria-checked={checked}
        checked={checked}
        disabled={disabled}
        id={name}
        onChange={onChange}
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
