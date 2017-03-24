import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

import { getClassNamesWithMods } from '../_helpers';
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

  optionRef = (onOptionRef, isSelected) => ref => onOptionRef(ref, isSelected);

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
          ref={this.optionRef(onOptionRef, isSelected)}
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
    const isFiltermode = this.props.filterMode;
    const mods = [];
    isFiltermode && mods.push('filter');
    isFiltermode && this.props.options.some(option => option.checked) && mods.push('state-active');

    const className = getClassNamesWithMods('ui-dropdown', mods);

    return (
      <Select
        className={className}
        clearable={this.props.clearable}
        menuRenderer={this.menuRenderer}
        multi={isFiltermode ? true : this.props.multi}
        name={this.props.name}
        onChange={this.onChange}
        optionComponent={isFiltermode ? DropdownFilterOptionComponent : undefined}
        options={this.props.options}
        placeholder={this.props.placeholder}
        scrollMenuIntoView={this.props.scrollMenuIntoView}
        searchable={this.props.searchable}
        value={this.props.value}
      />
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
 * Filter key
 */
  filterKey: PropTypes.string,
  /**
 * Filter mode
 */
  filterMode: PropTypes.bool,
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
};

export default DropDown;
