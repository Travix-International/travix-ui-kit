import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getClassNamesWithMods } from '../../_helpers';
import Checkbox from '../../checkbox/checkbox';

/**
   * Replasing ReactSelect item for filter mode.
   */
class DropdownFilterOption extends Component {
  onChange = (e) => {
    this.props.onSelect(this.props.option, e);
  }

  render() {
    const mods = [];
    this.props.option.disabled && mods.push('is-disabled');
    const className = getClassNamesWithMods('ui-dropdown-filter__option', mods);

    return (
      <div className={className}>
        <Checkbox
          checked={this.props.option.checked}
          disabled={this.props.option.disabled}
          name={`ui-dropdown-filter-${this.props.option.value}`}
          onChange={this.onChange}
        >
          {this.props.children}
        </Checkbox>
      </div>
    );
  }
}

DropdownFilterOption.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element.isRequired]
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  option: PropTypes.shape({
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default DropdownFilterOption;
