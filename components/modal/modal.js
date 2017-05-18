import React, { Component, PropTypes } from 'react';

import Global from '../global/global';
import KEY_CODE from '../constants/keyCode';
import { getClassNamesWithMods } from '../_helpers';

/**
 * Modal component
 */
class Modal extends Component {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    if (this.props.closeOnEsc) {
      global.window.document.addEventListener('keydown', this.handleKeyDown);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.active !== this.props.active) {
      if (newProps.active) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  componentWillUnmount() {
    if (this.props.closeOnEsc) {
      global.window.document.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  open() {
    global.window.requestAnimationFrame(() => {
      setTimeout(() => this.setState({ isOpen: true }), 0);
    });
  }

  close(e) {
    if (typeof this.props.onClose === 'function') {
      this.props.onClose(e);
    }
    global.window.requestAnimationFrame(() => {
      setTimeout(() => this.setState({ isOpen: false }), 300);
    });
  }

  handleClose = (e) => {
    this.close(e);
  };

  handleKeyDown = (e) => {
    if (e.keyCode === KEY_CODE.ESC) {
      this.close(e);
    }
  };

  handleOverlayClick = (e) => {
    const { closeOnOverlayClick, onOverlayClick } = this.props;
    if (typeof onOverlayClick === 'function') {
      onOverlayClick(e);
    }
    if (closeOnOverlayClick) {
      this.close(e);
    }
  };

  renderHeader() {
    const { title } = this.props;

    if (!title) {
      return null;
    }

    if (title.type === 'header') {
      return React.cloneElement(title, { className: 'ui-modal__header' });
    }

    let modalTitle = title;
    if (typeof title === 'string') {
      modalTitle = (
        <h3 className="ui-modal__title">{title}</h3>
      );
    }

    return (
      <header className="ui-modal__header">
        {modalTitle}
      </header>
    );
  }

  renderFooter() {
    const { footer } = this.props;

    if (!footer) {
      return null;
    }

    if (footer.type === 'footer') {
      return React.cloneElement(footer, { className: 'ui-modal__footer' });
    }

    return (
      <footer className="ui-modal__footer">
        {footer}
      </footer>
    );
  }

  renderCloseButton() {
    if (!(this.props.closable && this.props.onClose)) {
      return null;
    }

    return (
      <button
        className="ui-modal__close-button"
        onClick={this.handleClose}
        type="button"
      >
        <span>{this.props.closeButtonText}</span>
      </button>
    );
  }

  renderOverlay() {
    if (!this.props.overlay) {
      return null;
    }

    return (
      <div className="ui-modal__overlay" onClick={this.handleOverlayClick}/>
    );
  }

  render() {
    const { active, fullscreen, children } = this.props;
    const { isOpen } = this.state;
    const mods = this.props.mods ? this.props.mods.slice() : [];

    if (active) {
      mods.push('active');
    }

    if (!active && !isOpen) {
      return null;
    }

    if (isOpen) {
      mods.push('open');
    }
    if (fullscreen) {
      mods.push('fullscreen');
    }

    const className = getClassNamesWithMods('ui-modal', mods);

    return (
      <Global className={className}>
        {this.renderOverlay()}
        <div className={'ui-modal__container'}>
          {this.renderCloseButton()}
          {this.renderHeader()}
          <section className="ui-modal__content">
            {children}
          </section>
          {this.renderFooter()}
        </div>
      </Global>
    );
  }
}

Modal.defaultProps = {
  active: false,
  children: null,
  closable: true,
  closeButtonText: null,
  closeOnEsc: true,
  closeOnOverlayClick: true,
  footer: null,
  fullscreen: false,
  onClose: null,
  onOverlayClick: null,
  overlay: true,
  title: null,
};

Modal.propTypes = {
  /**
   * Determine whether a modal dialog is visible or not
   */
  active: PropTypes.bool,
  /**
   * The modal dialog's body
   */
  children: PropTypes.node,
  /**
   * Determine whether a close button is visible on top right of the modal dialog or not
   */
  closable: PropTypes.bool,
  /**
   * Text of the Close button
   */
  closeButtonText: PropTypes.node,
  /**
   * Determine whether to close the modal dialog on ESC event.
   */
  closeOnEsc: PropTypes.bool,
  /**
   * Determine whether to close the modal dialog when clicked on overlay.
   */
  closeOnOverlayClick: PropTypes.bool,
  /**
   * Footer content
   */
  footer: PropTypes.node,
  /**
   * Determine whether a modal dialog is visible on fullscreen or not
   */
  fullscreen: PropTypes.bool,
  /**
   * Set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  /**
   * Specify a function that will be called when a user clicked on overlay or close button on top right
   */
  onClose: PropTypes.func,
  /**
   * Specify a function that will be called when a user clicked on overlay
   */
  onOverlayClick: PropTypes.func,
  /**
   * Determine whether a overlay is visible or not
   */
  overlay: PropTypes.bool,
  /**
   * The modal dialog's title
   */
  title: PropTypes.node,
};

export default Modal;
