import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import React, { Component } from 'react';
import classnames from 'classnames';

import SlidingPanelHeader from './slidingPanelHeader/slidingPanelHeader';
import Global from '../global/global';
import { getClassNamesWithMods, getDataAttributes, warnAboutDeprecatedProp } from '../_helpers';

export default class SlidingPanel extends Component {
  state = {
    isActive: false,
    isOverlayHidden: true,
  };

  componentWillMount() {
    warnAboutDeprecatedProp(this.props.leftBlock, 'leftBlock', 'SlidingPanelHeader component');
    warnAboutDeprecatedProp(this.props.mods, 'mods', 'className');
    warnAboutDeprecatedProp(this.props.onBackButtonClick, 'onBackButtonClick', 'SlidingPanelHeader component');
    warnAboutDeprecatedProp(this.props.rightBlock, 'rightBlock', 'SlidingPanelHeader component');
    warnAboutDeprecatedProp(this.props.subheader, 'subheader', 'SlidingPanel component without SlidingPanelContent');
    warnAboutDeprecatedProp(this.props.title, 'title', 'SlidingPanelHeader component children');
    warnAboutDeprecatedProp(this.props.useDefaultLeftBlock, 'useDefaultLeftBlock', 'SlidingPanelHeader component');
  }

  componentWillReceiveProps(newProps) {
    if (newProps.active !== this.state.isActive) {
      if (newProps.active) {
        this.handleActive();
      } else {
        this.handleClose();
      }
    }
  }

  componentDidMount() {
    const { active } = this.props;
    if (active) {
      this.handleActive();
    }

    this.closeButtons = [].slice.call(ReactDom.findDOMNode(this).querySelectorAll('[data-rel="close"]'));
    this.closeButtons.forEach(b => b.addEventListener('click', this.handleClose));
  }

  componentWillUnmount() {
    this.closeButtons.forEach(b => b.removeEventListener('click', this.handleClose));
  }

  /**
   * Handles the click in the overlay.
   *
   * @method handleClickOverlay
   * @param {SyntheticEvent} e Click event trapped in the overlay element
   */
  handleClickOverlay = (e) => {
    if ((e.target === e.currentTarget) && this.props.closeOnOverlayClick) {
      this.handleClose(e);
    }
  }

  /**
   * Closes the panel.
   *
   * @method handleClose
   * @param {SyntheticEvent} e Click event trapped in the overlay element or close button
   */
  handleClose = (e) => {
    const { onTryingToClose } = this.props;

    if (onTryingToClose && onTryingToClose(e) === false) {
      return;
    }

    this.setState({ isActive: false });
  }

  /**
   * Opens the panel
   *
   * @method handleActive
   */
  handleActive = () => {
    const { onOpen } = this.props;

    this.setState({ isOverlayHidden: false, isActive: true }, () => {
      onOpen && onOpen();
    });
  }

  handleAnimationEnd = () => {
    const { onClose } = this.props;
    this.setState({ isOverlayHidden: !this.state.isActive }, () => {
      if (this.state.isOverlayHidden && onClose) {
        onClose();
      }
    });
  }

  render() {
    const {
      children,
      className,
      dataAttrs,
      direction,
      footer,
      leftBlock,
      global,
      onBackButtonClick,
      rightBlock,
      subheader,
      title,
      useDefaultLeftBlock,
      width,
    } = this.props;

    const overlayMods = [];
    const panelMods = this.props.mods ? this.props.mods.slice() : [];

    if (this.state.isOverlayHidden) {
      overlayMods.push('hidden');
    }

    if (this.state.isActive) {
      panelMods.push('active');
    }

    panelMods.push(direction);

    const panelClass = 'ui-sliding-panel';
    const panelClassName = classnames(getClassNamesWithMods(panelClass, panelMods), className);

    const overlayClass = 'ui-sliding-panel-overlay';
    const overlayClassName = getClassNamesWithMods(overlayClass, overlayMods);

    const subheaderClass = 'ui-sliding-panel__subheader';

    const footerBlock = footer ? (
      <div className="ui-sliding-panel__footer">
        {footer}
      </div>
    ) : null;

    const content = (
      <div className={overlayClassName} onClick={this.handleClickOverlay}>
        <div
          className={panelClassName}
          onAnimationEnd={this.handleAnimationEnd}
          style={{ width }}
          {...getDataAttributes(dataAttrs)}
        >
          { title && (
            <SlidingPanelHeader
              leftBlock={leftBlock}
              onBackButtonClick={onBackButtonClick}
              rightBlock={rightBlock}
              useDefaultLeftBlock={useDefaultLeftBlock}
            >
              { title }
            </SlidingPanelHeader>
          ) }

          { subheader && (
            <div className={subheaderClass}>
              {subheader}
            </div>
          ) }

          {children}

          {footerBlock}
        </div>
      </div>
    );

    return global
      ? (
        <Global noscroll={this.state.isActive}>
          {content}
        </Global>
      )
      : content;
  }
}

SlidingPanel.propTypes = {
  /**
   * Defines if the panel is open.
   */
  active: PropTypes.bool,

  /**
   * The text for default back button that will appear near the arrow icon
   */
  backButtonLabel: PropTypes.node,

  /**
   * Content, that will be wrapped by SlidingPanel
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

  /**
   * Attribute used to set specific classes
   */
  className: PropTypes.string,

  /**
   * When true, if the user clicks on the overaly, closes the panel.
   */
  closeOnOverlayClick: PropTypes.bool,

  /**
   * Data attributes. You can use it to set up any custom data-* attribute
   */
  dataAttrs: PropTypes.object,

  /**
   * Defines the direction of sidepanel.
   */
  direction: PropTypes.oneOf(['left', 'right']),

  /**
     * Global positioning (also this mode make body not scrollable).
     */
  global: PropTypes.bool,

  /**
   * Defines the footer's content.
   */
  footer: PropTypes.node,

  /**
   * When defined, this custom node appears on the left part of the header
   */
  leftBlock: PropTypes.node,

  /**
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),

  /**
   * Callback for back button
   */
  onBackButtonClick: PropTypes.func,

  /**
   * When defined, this function is triggered when the panel is closing.
   */
  onClose: PropTypes.func,

  /**
   * When defined, this function is triggered when the panel is opening.
   */
  onOpen: PropTypes.func,

  /**
   * Hook that will be executed when trying to close a panel if exists.
   * In case, of an event is passed as argument into this function it
   * was triggered as handler for click on some DOM element.
   * In another case, panel is trying to close via changing props.
   * If it returns false, the panel won't be closed.
   */
  onTryingToClose: PropTypes.func,

  /**
   * When defined, this custom node appears on the right part of the header
   */
  rightBlock: PropTypes.node,

  /**
   * If defined, can contain any subheader information which is displayed without default paddings
   */
  subheader: PropTypes.node,

  /**
   * Defines title for header. Optional. If it's defined header will be shown.
   */
  title: PropTypes.node,

  /**
   * When true, it will show the block with arrow icon and passed text (optional).
   * You can either enable it, or use leftBlock property to have more customization.
   */
  useDefaultLeftBlock: PropTypes.bool,

  /**
   * Defines the width of the panel.
   */
  width: PropTypes.string,
};

SlidingPanel.defaultProps = {
  closeOnOverlayClick: true,
  direction: 'right',
  global: false,
  subheader: null,
  useDefaultLeftBlock: false,
  width: '480px',
};
