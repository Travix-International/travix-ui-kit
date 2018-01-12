import classnames from "classnames";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

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
    const {
      active,
      align,
      axisOffsetX,
      axisOffsetY,
      className,
      dataAttrs,
      height,
      position,
      width,
    } = this.props;

    const mods = this.props.mods
      ? this.props.mods.slice()
      : [];

    const classes = classnames(className, getClassNamesWithMods('ui-tooltip', [
      ...mods,
      active ? 'active' : 'inactive',
      position,
      align,
    ]));

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
      <div className={classes} ref={this.linkChild} style={styles} {...getDataAttributes(dataAttrs)}>
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
   * Custom className(s) to be concatenated with the default ones
   * on the component's root element
   */
  className: PropTypes.string,
  /**
   * Data attribute. You can use it to set up GTM key or any custom data-* attribute
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
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
  dataAttrs: null,
  height: 'auto',
  position: 'top',
  showCloseButton: false,
  triggerAction: 'click',
  width: 'auto',
};
