import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';

import Input from '../input/input';
import Calendar from '../calendar/calendar';
import {
  getClassNamesWithMods,
  getDataAttributes,
  ejectOtherProps,
  warnAboutDeprecatedProp,
} from '../_helpers';

/**
 * DatePicker component
 */
class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.open,
    };
  }

  componentWillMount() {
    warnAboutDeprecatedProp(this.props.mods, 'mods', 'className');
  }

  initInputRef = (elem) => {
    this.input = elem;
  }

  blurInput() {
    if (this.input) {
      this.input.blur();
    }
  }

  focusInput() {
    if (this.input) {
      this.input.focus();
    }
  }

  handleItemMouseDown = (e) => {
    e.preventDefault();
  };

  handleInputBlur = (e) => {
    !this.props.open && this.setState({ active: false });
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(e);
    }
  };

  handleChange = (e) => {
    this.blurInput();
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e);
    }
  };

  handleInputFocus = (e) => {
    if (this.props.disabled) {
      return;
    }

    this.setState({ active: true });

    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(e);
    }
  };

  renderCalendar() {
    const { initialDates, locale, maxDate, minDate, selectionType } = this.props;

    return (
      <div
        aria-hidden={this.state.active}
        className="ui-datepicker__calendar-wrapper"
      >
        <Calendar
          initialDates={initialDates}
          locale={locale}
          maxDate={maxDate}
          minDate={minDate}
          multiplemode
          onMouseDown={this.handleItemMouseDown}
          onSelectDay={this.handleChange}
          selectionType={selectionType}
        />
      </div>
    );
  }

  render() {
    const {
      className,
      dataAttrs = {},
      disabled,
      inputMods = [],
      label,
      mods = [],
      name,
      onClick,
      placeholder,
      value,
      valueFormatterFn,
    } = this.props;

    const otherProps = ejectOtherProps(this.props, DatePicker.propTypes);

    let displayValue = value;
    if (value && typeof valueFormatterFn === 'function') {
      displayValue = valueFormatterFn(value);
    }

    this.state.active && mods.push('active');
    const classes = classnames(
      getClassNamesWithMods('ui-datepicker', mods),
      className
    );
    inputMods.push('datepicker');

    const labelBlock = label
      ? (
        <label htmlFor={`ui-datepicker-input-${name}`} id={`ui-datepicker-label-${name}`}>
          {label}
        </label>
      )
      : '';

    return (
      <div
        {...getDataAttributes(dataAttrs)}
        {...otherProps}
        className={classes}
      >
        {labelBlock}
        <Input
          disabled={disabled}
          id={`ui-datepicker-input-${name}`}
          mods={inputMods}
          name={name}
          onBlur={this.handleInputBlur}
          onClick={onClick}
          onFocus={this.handleInputFocus}
          onKeyDown={this.handleInputKeyDown}
          placeholder={placeholder}
          readOnly
          ref={this.initInputRef}
          type="text"
          value={displayValue}
        />
        {this.renderCalendar()}
      </div>
    );
  }
}

DatePicker.defaultProps = {
  open: false,
  selectionType: 'normal',
  name: '',
  value: '',
};

DatePicker.propTypes = {
  /**
   * Attribute used to set specific classes which will be combined
   * with the component class + mods.
   */
  className: PropTypes.string,

  /**
   * Data attribute. You can use it to set up GTM key or any custom data-* attribute.
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /**
  * Disable date picker.
  */
  disabled: PropTypes.bool,
  /**
   * Optional. Initial value of the calendar.
   */
  initialDates: PropTypes.arrayOf(PropTypes.string),
  /**
   * Set of custom modifications for input.
   */
  inputMods: PropTypes.arrayOf(PropTypes.string),
  /**
   * Label for datepicker.
   */
  label: PropTypes.string,
  /**
   * Locale definitions, with the calendar's months and weekdays in the right language.
   * Also contains the startWeekDay which defines in which week day starts the week.
   */
  locale: PropTypes.shape({
    months: PropTypes.array,
    weekDays: PropTypes.array,
    startWeekDay: PropTypes.number,
  }),
  /**
   * Sets the max date boundary. Defaults to `null`.
   */
  maxDate: PropTypes.string,

  /**
   * Sets the min date boundary. Defaults to `null`.
   */
  minDate: PropTypes.string,
  /**
 * Set of custom modifications.
 */
  mods: PropTypes.arrayOf(PropTypes.string),
  /**
   * Represents the element's name.
   */
  name: PropTypes.string.isRequired,
  /**
   * onBlur handler
   */
  onBlur: PropTypes.func,
  /**
   * onFocus handler
   */
  onFocus: PropTypes.func,
  /**
   * onClick handler
   */
  onClick: PropTypes.func,
  /**
 * onChange handler: function (newValue) {}
 */
  onChange: PropTypes.func.isRequired,
  /**
 * open: calendar panel is open
 */
  open: PropTypes.bool,
  /**
   * Placeholder for input element .
   */
  placeholder: PropTypes.string,
  /**
   * Optional. Type of date selection.
   */
  selectionType: PropTypes.oneOf(['normal', 'range']),
  /**
   * Initial value of the calendar.
   */
  value: PropTypes.string,
  /**
 * Function for formatting displayed value in the input
 */
  valueFormatterFn: PropTypes.func,
};

export default DatePicker;
