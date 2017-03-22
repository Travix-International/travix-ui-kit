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
  checked: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  disabled: PropTypes.bool,
  inputAttr: PropTypes.object,
  labelAttr: PropTypes.object,
  mods: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
