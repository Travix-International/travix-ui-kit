import React, { PropTypes } from 'react';
import { getClassNamesWithMods } from '../_helpers';
import Checkbox from '../checkbox/checkbox';

  /**
   * @property {Function} onSelect Passed by react-select internally
   * @property {Object} option Passed by user of Dropdown for filter
   */
function DropdownFilterOptionComponent({ option, onSelect, children }) {
  const mods = [];
  option.disabled && mods.push('is-disabled');
  const className = getClassNamesWithMods('ui-dropdown-filter__option', mods);

  return (
    <div className={className}>
      <Checkbox
        checked={option.checked}
        disabled={option.disabled}
        name={option.value}
        onChange={event => onSelect(option, event)}
      >
        {children}
      </Checkbox>
    </div>
  );
}

DropdownFilterOptionComponent.propTypes = {
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
  }),
};

export default DropdownFilterOptionComponent;
