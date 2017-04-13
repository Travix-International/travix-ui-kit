import React, { Component, PropTypes } from 'react';

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
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  handleInputChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  handleInputFocus = (e) => {
    if (this.props.disabled) {
      return;
    }

    this.setState({ isFocused: true });

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

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

  render() {
    const {
      dataAttrs = {},
      disabled,
      mods = [],
      multiline,
      value,
      ...otherProps
    } = this.props;

    this.state.isFocused && mods.push('focused');
    const className = getClassNamesWithMods('ui-input', mods);

    let Element = multiline ? 'textarea' : 'input';

    return (
      <Element
        {...getDataAttributes(dataAttrs)}
        {...otherProps}
        className={className}
        disabled={disabled}
        onBlur={this.handleInputBlur}
        onChange={this.handleInputChange}
        onFocus={this.handleInputFocus}
        ref={elem => (this.input = elem)}
        value={value}
      />
    );
  }
}

Input.defaultProps = {
  disabled: false,
  multiline: false,
};

Input.propTypes = {
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
   * The callback for onFocus event.
   */
  onFocus: PropTypes.func,
  /**
   * Set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  /**
   * Multiline mode (textarea).
   */
  multiline: PropTypes.bool,
  /**
   * The value of the text field.
   */
  value: PropTypes.string,
};

export default Input;
