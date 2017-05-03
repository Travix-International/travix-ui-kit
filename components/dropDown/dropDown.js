import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

import { getClassNamesWithMods, getDataAttributes } from '../_helpers';
import DropdownFilterOptionComponent from './dropdownFilterOptionComponent';

/**
 * DropDown component
 */
class DropDown extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.menuRenderer = this.menuRenderer.bind(this);
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
      clearable,
      dataAttrs = {},
      filterMode,
      mods = [],
      multi,
      name,
      options,
      placeholder,
      scrollMenuIntoView,
      searchable,
      value,
      ...otherProps
    } = this.props;

    const isFiltermode = this.props.filterMode;

    filterMode && mods.push('filter');
    filterMode && this.props.options.some(option => option.checked) && mods.push('state-active');

    const className = getClassNamesWithMods('ui-dropdown', mods);

    return (
      <div {...getDataAttributes(dataAttrs)}>
        <Select
          {...otherProps}
          className={className}
          clearable={clearable}
          menuRenderer={this.menuRenderer}
          multi={isFiltermode ? true : multi}
          name={name}
          onChange={this.onChange}
          optionComponent={isFiltermode ? DropdownFilterOptionComponent : undefined}
          options={options}
          placeholder={placeholder}
          scrollMenuIntoView={scrollMenuIntoView}
          searchable={searchable}
          value={value}
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
 * Filter key
 */
  filterKey: PropTypes.string,
  /**
 * Filter mode
 */
  filterMode: PropTypes.bool,
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
 * Initial field value
 */
  value: PropTypes.any,
};

export default DropDown;
