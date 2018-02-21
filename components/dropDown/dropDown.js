import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Select from 'react-select/dist/react-select';
import classnames from 'classnames';

import { getClassNamesWithMods, getDataAttributes, warnAboutDeprecatedProp } from '../_helpers';
import DropdownFilterOptionComponent from './dropdownFilterOptionComponent';

/**
 * DropDown component
 */
class DropDown extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.menuRenderer = this.menuRenderer.bind(this);
    this.valueRenderer = this.valueRenderer.bind(this);
  }

  componentWillMount() {
    warnAboutDeprecatedProp(this.props.mods, 'mods', 'className');
  }

  static optionRef(onOptionRef, isSelected) {
    return ref => onOptionRef(ref, isSelected);
  }

  /**
   * Overriding the internal method of react-select for fix autoscrolling
   */
  menuRenderer({
    focusedOption,
    instancePrefix,
    onFocus,
    onSelect,
    optionClassName,
    optionComponent,
    optionRenderer,
    options,
    valueArray,
    valueKey,
    onOptionRef,
  }) {
    let Option = optionComponent;

    return options.map((option, i) => {
      let isSelected = valueArray && valueArray.indexOf(option) > -1;
      let isFocused = option === focusedOption;
      const classes = ['Select-option'];

      optionClassName && classes.push(optionClassName);
      isSelected && classes.push('is-selected');
      isFocused && classes.push('is-focused');
      option.disabled && classes.push('is-disabled');
      const optionClass = classes.join(' ');

      return (
        <Option
          className={optionClass}
          instancePrefix={instancePrefix}
          isDisabled={option.disabled}
          isFocused={this.props.filterMode ? false : isFocused}
          isSelected={isSelected}
          key={`option-${i}-${option[valueKey]}`}
          onFocus={onFocus}
          onSelect={onSelect}
          option={option}
          optionIndex={i}
          ref={DropDown.optionRef(onOptionRef, isSelected)}
        >
          {optionRenderer(option, i)}
        </Option>
      );
    });
  }

  /**
   * Overriding the internal method of react-select to add icon to value label
   */
  valueRenderer({ label }) {
    const iconClasses = classnames('Select-value-label-icon', this.props.icon);

    return (
      <span className={iconClasses}>{label}</span>
    );
  }

  /**
   * @param {Array} changedOptions
   */
  onChange(changedOptions) {
    if (!this.props.filterMode) {
      this.props.onChange(changedOptions);
      return;
    }

    const option = changedOptions[0];
    const optionIndex = this.props.options.findIndex(o => o.value === option.value);
    this.props.onChange(option, optionIndex, this.props.filterKey);
  }

  render() {
    const {
      className,
      clearable,
      dataAttrs = {},
      disabled,
      filterMode,
      icon,
      mods = [],
      multi,
      name,
      options,
      placeholder,
      scrollMenuIntoView,
      searchable,
      status,
      value,
      ...otherProps
    } = this.props;

    const selectClasses = classnames(getClassNamesWithMods('ui-dropdown', [
      ...mods,
      filterMode && 'filter',
      filterMode && options.some(option => option.checked) && 'state-active',
      status,
    ]), className);

    return (
      <div {...getDataAttributes(dataAttrs)}>
        <Select
          {...otherProps}
          className={selectClasses}
          clearable={clearable}
          disabled={disabled}
          menuRenderer={this.menuRenderer}
          multi={filterMode ? true : multi}
          name={name}
          onChange={this.onChange}
          optionComponent={filterMode ? DropdownFilterOptionComponent : undefined}
          options={options}
          placeholder={placeholder}
          scrollMenuIntoView={scrollMenuIntoView}
          searchable={searchable}
          value={value}
          valueRenderer={icon ? this.valueRenderer : null}
        />
      </div>
    );
  }
}

DropDown.defaultProps = {
  clearable: false,
  filterMode: false,
  multi: false,
  placeholder: '',
  scrollMenuIntoView: false,
  searchable: false,
};

DropDown.propTypes = {
  /**
   * Attribute used to set specific classes which will be combined
   * with the "ui-dropdown" class + mods.
   */
  className: PropTypes.string,
  /**
 * Should it be possible to reset value
 */
  clearable: PropTypes.bool,
  /**
   * Data attribute. You can use it to set up GTM key or any custom data-* attribute.
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /**
   * Current activity state of DropDown
   */
  disabled: PropTypes.bool,
  /**
 * Filter key
 */
  filterKey: PropTypes.string,
  /**
 * Filter mode
 */
  filterMode: PropTypes.bool,
  /**
   * Icon className for value label
   */
  icon: PropTypes.string,
  /**
 * Set of custom modifications.
 */
  mods: PropTypes.arrayOf(PropTypes.string),
  /**
 * Multi-value input
 */
  multi: PropTypes.bool,
  /**
 * Generates a hidden &lt;input /&gt; tag with this field name for html forms
 */
  name: PropTypes.string,
  /**
 * onChange handler: function (newValue) {}
 */
  onChange: PropTypes.func.isRequired,
  /**
 * Array of options
 */
  options: PropTypes.array.isRequired,
  /**
 * Field placeholder, displayed when there's no value
 */
  placeholder: PropTypes.string,
  /**
 * Boolean to enable the viewport to shift so that the full menu fully visible when engaged
 */
  scrollMenuIntoView: PropTypes.bool,
  /**
 * Whether to enable searching feature or not
 */
  searchable: PropTypes.bool,
  /**
   * The status of the DropDown.
   */
  status: PropTypes.oneOf(['error', 'valid']),
  /**
 * Initial field value
 */
  value: PropTypes.any,
};

export default DropDown;
