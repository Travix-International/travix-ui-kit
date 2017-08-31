import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getClassNamesWithMods } from '../_helpers';

export default class Tooltip extends Component {
  render() {
    const className = getClassNamesWithMods('ui-tooltip', [
      // ...mods,
      this.props.active ? 'active' : 'inactive',
    ]);
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

Tooltip.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
};

Tooltip.defaultProps = {
  active: false,
  children: '',
};
