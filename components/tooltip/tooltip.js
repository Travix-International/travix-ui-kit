import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getClassNamesWithMods, getNum } from '../_helpers';

export function getOffset(length, margin) {
  return -getNum(length) - getNum(margin);
}

export default class Tooltip extends Component {
  linkChild = (ref) => {
    this.container = ref;
  }

  countPositionOffset() {
    const { margin, oppositeAxisOffset } = this.props;

    const { width, height } = this.container.getBoundingClientRect();

    const yOffset = getOffset(height, margin);
    const xOffset = getOffset(width, margin);

    const positions = {
      top: { top: yOffset, left: oppositeAxisOffset },
      bottom: { bottom: yOffset, left: oppositeAxisOffset },
      right: { right: xOffset, bottom: oppositeAxisOffset },
      left: { left: xOffset, bottom: oppositeAxisOffset },
    };

    return positions;
  }

  renderCloseButtonBlock() {
    const { showCloseButton, onCloseButtonClick, triggerAction } = this.props;

    return (showCloseButton && triggerAction === 'click')
      ? (
        <div className="ui-tooltip__close-button-section">
          <button
            className="ui-tooltip__close-button"
            onClick={onCloseButtonClick}
          />
        </div>
      )
      : null;
  }

  render() {
    const { width, height, active, position } = this.props;

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
      const positions = this.countPositionOffset();

      styles = { ...styles, ...positions[this.props.position] };
    }

    return (
      <div className={className} ref={this.linkChild} style={styles}>
        {this.renderCloseButtonBlock()}
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
  onCloseButtonClick: PropTypes.func,
  oppositeAxisOffset: PropTypes.string,
  position: PropTypes.oneOf([
    'bottom',
    'left',
    'right',
    'top',
  ]),
  showCloseButton: PropTypes.bool,
  triggerAction: PropTypes.oneOf([
    'click',
    'hover',
  ]),
  width: PropTypes.string,
};

Tooltip.defaultProps = {
  active: false,
  children: '',
  height: '',
  margin: '15px',
  oppositeAxisOffset: '0',
  showCloseButton: false,
  triggerAction: 'click',
  width: '',
};
