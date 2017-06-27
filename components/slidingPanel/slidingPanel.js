import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

export default class SlidingPanel extends Component {
  constructor(props) {
    super(props);

    this.state = { hideOverlay: true, isOpen: false };

    this.handleClickOverlay = this.handleClickOverlay.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
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
    closeOnOverlay: PropTypes.bool,

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
     * When defined, this function is triggered when the panel is opening.
     */
    onOpen: PropTypes.func,

    /**
     * Defines if the panel is open.
     */
    open: PropTypes.bool,
  }

  componentWillReceiveProps(newProps) {
    if (newProps.open !== this.state.isOpen) {
      if (newProps.open) {
        this.handleOpen();
      } else {
        this.handleClose();
      }
    }
  }

  componentDidMount() {
    const { open } = this.props;
    if (open) {
      this.handleOpen();
    }

    this.panel.addEventListener('transitionend', this.handleTransitionEnd);

    const rootNode = findDOMNode(this);
    const closeButton = rootNode.querySelector('[rel="close"]');
    if (closeButton) {
      closeButton.addEventListener('click', this.handleClose);
    }
  }

  /**
   * Handles the click in the overlay.
   *
   * @method handleClickOverlay
   * @param {SyntheticEvent} e Click event trapped in the overlay element
   */
  handleClickOverlay(e) {
    if ((e.target === e.currentTarget) && this.props.closeOnOverlay) {
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
    const { onClose } = this.props;

    this.setState({ isOpen: false }, () => {
      if (onClose) {
        onClose();
      }
    });
  }

  /**
   * Opens the panel
   *
   * @method handleOpen
   */
  handleOpen() {
    const { onOpen } = this.props;

    this.setState({ hideOverlay: false }, () => {
      setTimeout(() => {
        this.setState({ isOpen: true }, () => {
          if (onOpen) {
            onOpen();
          }
        });
      }, 0);
    });
  }

  handleTransitionEnd(e) {
    if (e.propertyName === 'transform') {
      this.setState({ hideOverlay: !this.state.isOpen });
    }
  }

  render() {
    const {
      dataAttrs,
      children,
    } = this.props;

    const overlayMods = [];
    const panelMods = this.props.mods ? this.props.mods.slice() : [];

    if (this.state.hideOverlay) {
      overlayMods.push('hide');
    }

    if (this.state.isOpen) {
      panelMods.push('open');
    }

    const panelClass = 'ui-sliding-panel';
    const panelClassName = getClassNamesWithMods(panelClass, panelMods);

    const overlayClass = 'ui-sliding-panel-overlay';
    const overlayClassName = getClassNamesWithMods(overlayClass, overlayMods);

    return (
      <div className={overlayClassName} onClick={this.handleClickOverlay}>
        <div
          className={panelClassName}
          ref={e => (this.panel = e)}
          {...getDataAttributes(dataAttrs)}
        >
          {children}
        </div>
      </div>
    );
  }
}
