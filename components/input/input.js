import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { Component } from 'react';

import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

/**
 * General Input component.
 */
class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };
  }

  handleInputBlur = (e) => {
    this.setState({ isFocused: false });
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(e);
    }
  };

  handleInputChange = (e) => {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e);
    }
  };

  handleInputFocus = (e) => {
    if (this.props.disabled) {
      return;
    }

    this.setState({ isFocused: true });

    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(e);
    }
  };

  ref = (elem) => {
    this.input = elem;
  }

  blur() {
    if (this.input) {
      this.input.blur();
    }
  }

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  select() {
    if (this.input) {
      this.input.select();
    }
  }

  renderStatusIcon() {
    return this.props.status ? <span className="ui-input-status" /> : null;
  }

  render() {
    const {
      ariaActivedescendant,
      ariaAutocomplete,
      ariaExpanded,
      ariaHaspopup,
      ariaLabelledby,
      ariaOwns,
      autoComplete,
      className,
      dataAttrs = {},
      disabled,
      id,
      hidden,
      multiline,
      name,
      onClick,
      onKeyDown,
      placeholder,
      readOnly,
      role,
      type,
      status,
      value,
    } = this.props;
    const mods = this.props.mods ? this.props.mods.slice() : [];
    if (disabled) {
      mods.push('disabled');
    }

    (!this.state.isFocused && status) && mods.push(status);
    this.state.isFocused && mods.push('focused');
    const inputClasses = classnames(getClassNamesWithMods('ui-input', mods), className);

    let Element = multiline ? 'textarea' : 'input';

    return (
      <div className="ui-input-container">
        <Element
          {...getDataAttributes(dataAttrs)}
          aria-activedescendant={ariaActivedescendant}
          aria-autocomplete={ariaAutocomplete}
          aria-expanded={ariaExpanded}
          aria-haspopup={ariaHaspopup}
          aria-labelledby={ariaLabelledby}
          aria-owns={ariaOwns}
          autoComplete={autoComplete}
          className={inputClasses}
          disabled={disabled}
          hidden={hidden}
          id={id}
          name={name}
          onBlur={this.handleInputBlur}
          onChange={this.handleInputChange}
          onClick={onClick}
          onFocus={this.handleInputFocus}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={this.ref}
          role={role}
          type={type}
          value={value}
        />
        {this.renderStatusIcon()}
      </div>
    );
  }
}

Input.defaultProps = {
  disabled: false,
  multiline: false,
};

Input.propTypes = {
  /**
   * Aria active descendant
   */
  ariaActivedescendant: PropTypes.string,
  /**
   * Aria autocomplete
   */
  ariaAutocomplete: PropTypes.string,
  /**
   * If aria is expanded
   */
  ariaExpanded: PropTypes.bool,
  /**
   * If aria has popup
   */
  ariaHaspopup: PropTypes.bool,
  /**
   * Aria label led by
   */
  ariaLabelledby: PropTypes.string,
  /**
   * Aria owns
   */
  ariaOwns: PropTypes.string,
  /**
   * Is autocomplete on
   */
  autoComplete: PropTypes.string,
  /**
   * Classname for input
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
   * Current activity state of input.
   */
  disabled: PropTypes.bool,
  /**
   * Input id
   */
  id: PropTypes.string,
  /**
   * Is input hidden
   */
  hidden: PropTypes.bool,
  /**
   * Set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  /**
   * Multiline mode (textarea).
   */
  multiline: PropTypes.bool,
  /**
   * Name applied to the input.
   */
  name: PropTypes.string,
  /**
   * The callback for onBlur event.
   */
  onBlur: PropTypes.func,
  /**
   * The callback for onChange event.
   */
  onChange: PropTypes.func,
  /**
   * The callback for onClick event.
   */
  onClick: PropTypes.func,
  /**
   * The callback for onFocus event.
   */
  onFocus: PropTypes.func,
  /**
   * On key down function
   */
  onKeyDown: PropTypes.func,
  /**
   * Inputs placeholder
   */
  placeholder: PropTypes.string,
  /**
   * If input read only
   */
  readOnly: PropTypes.bool,
  /**
   * The role of the text field.
   */
  role: PropTypes.string,
  /**
   * The status of the text field.
   */
  status: PropTypes.oneOf(['error', 'valid']),
  /**
   * The type of input
   */
  type: PropTypes.string,
  /**
   * The value of the text field.
   */
  value: PropTypes.string,
};

export default Input;
