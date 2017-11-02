import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SlidingPanelHeader from './slidingPanelHeader';
import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

export default class SlidingPanel extends Component {
  constructor(props) {
    super(props);

    this.state = { isOverlayHidden: true, isActive: false };

    this.handleClickOverlay = this.handleClickOverlay.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,

    /**
     * When true, if the user clicks on the overaly, closes the panel.
     */
    closeOnOverlayClick: PropTypes.bool,

    /**
     * Hook that will be executed when trying to close a panel if exists.
     * If it returns false, the panel won't be closed.
     */
    onTryingToClose: PropTypes.func,

    /**
     * Data attributes. You can use it to set up any custom data-* attribute
     */
    dataAttrs: PropTypes.object,

    /**
     * You can provide set of custom modifications.
     */
    mods: PropTypes.arrayOf(PropTypes.string),

    /**
     * When defined, this function is triggered when the panel is closing.
     */
    onClose: PropTypes.func,

    /**
     * When defined, this custom node appears on the left part of the header
     */
    leftBlock: PropTypes.node,

    /**
     * When defined, this custom node appears on the right part of the header
     */
    rightBlock: PropTypes.node,

    /**
     * When defined, this function is triggered when the panel is opening.
     */
    onOpen: PropTypes.func,

    /**
     * Defines if the panel is open.
     */
    active: PropTypes.bool,

    /**
     * Defines title for header. Optional. If it's defined header will be shown.
     */
    title: PropTypes.string,
  }

  static defaultProps = {
    closeOnOverlayClick: true,
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

    this.panel.addEventListener('transitionend', this.handleTransitionEnd);

    this.closeButtons = [].slice.call(this.panel.querySelectorAll('[data-rel="close"]'));
    this.closeButtons.forEach(b => b.addEventListener('click', this.handleClose));
  }

  componentWillUnmount() {
    this.panel.removeEventListener('transitionend', this.handleTransitionEnd);
    this.closeButtons.forEach(b => b.removeEventListener('click', this.handleClose));
  }

  /**
   * Handles the click in the overlay.
   *
   * @method handleClickOverlay
   * @param {SyntheticEvent} e Click event trapped in the overlay element
   */
  handleClickOverlay(e) {
    if ((e.target === e.currentTarget) && this.props.closeOnOverlayClick) {
      this.handleClose();
    }
  }

  /**
   * Closes the panel.
   *
   * @method handleClose
   * @param {SyntheticEvent} e Click event trapped in the overlay element
   */
  handleClose() {
    const { onTryingToClose } = this.props;

    if (onTryingToClose && onTryingToClose() === false) {
      return;
    }

    this.setState({ isActive: false });
  }

  /**
   * Opens the panel
   *
   * @method handleActive
   */
  handleActive() {
    const { onOpen } = this.props;

    this.setState({ isOverlayHidden: false }, () => {
      setTimeout(() => {
        this.setState({ isActive: true }, () => {
          if (onOpen) {
            onOpen();
          }
        });
      }, 0);
    });
  }

  handleTransitionEnd(e) {
    const { onClose } = this.props;
    if (e.propertyName === 'transform') {
      this.setState({ isOverlayHidden: !this.state.isActive }, () => {
        if (this.state.isOverlayHidden && onClose) {
          onClose();
        }
      });
    }
  }

  render() {
    const {
      dataAttrs,
      children,
      title,
      leftBlock,
      rightBlock,
    } = this.props;

    const overlayMods = [];
    const panelMods = this.props.mods ? this.props.mods.slice() : [];

    if (this.state.isOverlayHidden) {
      overlayMods.push('hidden');
    }

    if (this.state.isActive) {
      panelMods.push('active');
    }

    const panelClass = 'ui-sliding-panel';
    const panelClassName = getClassNamesWithMods(panelClass, panelMods);

    const overlayClass = 'ui-sliding-panel-overlay';
    const overlayClassName = getClassNamesWithMods(overlayClass, overlayMods);

    return (
      <div className={overlayClassName} onClick={this.handleClickOverlay}>
        <div
          className={panelClassName}
          ref={(e) => { this.panel = e; }}
          {...getDataAttributes(dataAttrs)}
        >
          {title &&
            <SlidingPanelHeader
              leftBlock={leftBlock}
              rightBlock={rightBlock}
              title={title}
            />}
          <div className="ui-sliding-panel__content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}
