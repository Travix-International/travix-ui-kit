// Imports
import React, { PropTypes } from 'react';

import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

function RadioButton({
  checked,
  children,
  dataAttrs = false,
  disabled,
  id,
  mods = [],
  name,
  onChange }) {
  const restProps = getDataAttributes(dataAttrs);

  if (disabled) {
    mods.push('disabled_true');
  }

  const className = getClassNamesWithMods('ui-radio', mods);

  return (
    <div className={className} {...restProps}>
      <input
        checked={checked}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        type="radio"
      />
      <label aria-checked={checked} htmlFor={id} role="radio">
        {children}
      </label>
    </div>
  );
}

RadioButton.defaultProps = {
  checked: false,
  disabled: false,
};

RadioButton.propTypes = {
  /**
   * Radio Button value.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]),

  /**
   * Represents the state of the radio button.
   */
  checked: PropTypes.bool,

  /**
   * Data attribute. You can use it to set up GTM key or any custom data-* attribute.
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),

  /**
   * Current activity state of the Radio Button.
   */
  disabled: PropTypes.bool,

  /**
   * Identifier for Radio Button element.
   */
  id: PropTypes.string.isRequired,

  /**
   * Represents the element's name.
   */
  name: PropTypes.string,

  /**
   * Represents the callback for onChange event.
   */
  onChange: PropTypes.func,

  /**
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
};

export default RadioButton;
