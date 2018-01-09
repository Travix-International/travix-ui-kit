// Imports
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

/**
 * RadioButton component
 */
function RadioButton(props) {
  const {
    checked,
    children,
    className,
    dataAttrs = {},
    disabled,
    id,
    name,
    onChange,
  } = props;
  const dataAttributes = getDataAttributes(dataAttrs);
  const mods = props.mods ? props.mods.slice() : [];

  if (disabled) {
    mods.push('disabled');
  }

  const classNames = classnames(getClassNamesWithMods('ui-radio', mods), className);

  return (
    <div className={classNames} {...dataAttributes}>
      <input
        checked={checked}
        className="ui-radio__input-radio"
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        readOnly={!onChange}
        type="radio"
      />
      <label aria-checked={checked} className="ui-radio__label" htmlFor={id} role="radio">
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
   * Represents the state of the radio button.
   */
  checked: PropTypes.bool,

  /**
   * Radio Button label.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
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
