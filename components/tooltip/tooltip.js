import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getClassNamesWithMods } from '../_helpers';

export default class Tooltip extends Component {
  linkChild = (ref) => {
    this.container = ref;
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
    const { axisOffsetX, axisOffsetY, align, width, height, active, position } = this.props;

    const mods = this.props.mods
      ? this.props.mods.slice()
      : [];

    const className = getClassNamesWithMods('ui-tooltip', [
      ...mods,
      active ? 'active' : 'inactive',
      position,
      align,
    ]);

    let styles = {
      width,
      height,
    };

    const transformValue = [axisOffsetX, axisOffsetY].filter(x => /((\d)(px|%))|\b0\b/i.test(x)).join(', ');

    if (this.container) {
      styles = { ...styles };
      transformValue && (styles.transform = `translate(${transformValue})`);
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
  /**
   * Determines whether the component is visible.
   */
  active: PropTypes.bool,
  /**
   * The tooltip align.
   */
  align: PropTypes.oneOf([
    'center',
    'start',
    'end',
  ]),
  /**
   * The offset for the axis x (px, %).
   */
  axisOffsetX: PropTypes.string,
  /**
   * The offset for the axis y (px, %).
   */
  axisOffsetY: PropTypes.string,
  /**
   * Tooltip content.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  /**
   * The height of the component (px)
   */
  height: PropTypes.string,
  /**
   * Set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  /**
   * The callback to be called on close button clicking.
   */
  onCloseButtonClick: PropTypes.func,
  /**
   * The position.
   */
  position: PropTypes.oneOf([
    'bottom',
    'left',
    'right',
    'top',
  ]),
  /**
   * Determines whether the close button is visible
   * (for onClick action only)
   */
  showCloseButton: PropTypes.bool,
  /**
   * Determines the action on which the component is triggered
   */
  triggerAction: PropTypes.oneOf([
    'click',
    'hover',
  ]),
  /**
   * The width of the component (px)
   */
  width: PropTypes.string,
};

Tooltip.defaultProps = {
  active: false,
  align: 'center',
  children: '',
  height: 'auto',
  oppositeAxisOffset: '0',
  position: 'top',
  showCloseButton: false,
  triggerAction: 'click',
  width: 'auto',
};
