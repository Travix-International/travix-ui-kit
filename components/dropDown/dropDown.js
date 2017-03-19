import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

import { getClassNamesWithMods } from '../_helpers';

/**
 * DropDown component
 */
class DropDown extends Component {
  render() { // eslint-disable-line
    const className = getClassNamesWithMods('ui-dropdown');

    return (
      <Select
        className={className}
        clearable={this.props.clearable}
        multi={this.props.multi}
        name={this.props.name}
        onChange={this.props.onChange}
        options={this.props.options}
        scrollMenuIntoView={this.props.scrollMenuIntoView}
        searchable={this.props.searchable}
        value={this.props.value}
      />
    );
  }
}

DropDown.defaultProps = {
  className: '',
  clearable: false,
  multi: false,
  scrollMenuIntoView: false,
  searchable: false,
};

DropDown.propTypes = {
  className: PropTypes.string,
  clearable: PropTypes.bool,
  multi: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  scrollMenuIntoView: PropTypes.bool,
  searchable: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
};

export default DropDown;
