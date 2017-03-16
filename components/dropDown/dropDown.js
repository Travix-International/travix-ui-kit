import React, { Component, PropTypes } from 'react';

import { getClassNamesWithMods } from '../_helpers';

/**
 * DropDown component
 */
class DropDown extends Component {
  render() { // eslint-disable-line
    const className = getClassNamesWithMods('ui-dropdown');

    return (
      <div className={className}>
        DropDown
      </div>
    );
  }
}

DropDown.defaultProps = {
  active: false,
};

DropDown.propTypes = {
  active: PropTypes.bool,
};

export default DropDown;
