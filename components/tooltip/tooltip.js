import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getClassNamesWithMods } from '../_helpers';

export default class Tooltip extends Component {
  render() {
    const className = getClassNamesWithMods('ui-tooltip', [
      // ...mods,
      this.props.active ? 'active' : 'inactive',
      this.props.position,
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
  position: PropTypes.oneOf([
    'bottom',
    'left',
    'right',
    'top',
  ]),
};

Tooltip.defaultProps = {
  active: false,
  children: '',
};
