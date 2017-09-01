import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getClassNamesWithMods } from '../_helpers';

export function getNum(string) {
  return parseInt(string, 10);
}

export default class Tooltip extends Component {
  linkChild = (ref) => {
    this.container = ref;
  }

  render() {
    const {
      width,
      height,
      active,
      position,
    } = this.props;

    const mods = this.props.mods
      ? this.props.mods.slice()
      : [];

    const className = getClassNamesWithMods('ui-tooltip', [
      ...mods,
      active ? 'active' : 'inactive',
      position,
    ]);

    let styles = {
      width,
      height,
    };

    if (this.container) {
      const offsets = this.container.getBoundingClientRect();
      const actualWidth = offsets.width;
      const actualHeight = offsets.height;

      const yOffset = -getNum(actualHeight) - getNum(this.props.margin);
      const xOffset = -getNum(actualWidth) - getNum(this.props.margin);

      const positions = {
        top: { top: yOffset, left: this.props.oppositeAxisOffset },
        bottom: { bottom: yOffset, left: this.props.oppositeAxisOffset },
        right: { right: xOffset, bottom: this.props.oppositeAxisOffset },
        left: { left: xOffset, bottom: this.props.oppositeAxisOffset },
      };

      styles = { ...styles, ...positions[this.props.position] };
    }

    return (
      <div className={className} ref={this.linkChild} style={styles}>
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
  height: PropTypes.string,
  margin: PropTypes.string,
  /**
   * Set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  oppositeAxisOffset: PropTypes.string,
  position: PropTypes.oneOf([
    'bottom',
    'left',
    'right',
    'top',
  ]),
  width: PropTypes.string,
};

Tooltip.defaultProps = {
  active: false,
  children: '',
  height: '',
  margin: '15px',
  oppositeAxisOffset: '0',
  width: '',
};
