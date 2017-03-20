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
  clearable: false,
  multi: false,
  scrollMenuIntoView: false,
  searchable: false,
};

DropDown.propTypes = {
  /**
 * Should it be possible to reset value
 */
  clearable: PropTypes.bool,
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
};

export default DropDown;
