// Imports
import React, { Component, PropTypes } from 'react';

import Global from '../global/global';
import { getClassNamesWithMods } from '../_helpers';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    if (this.props.closeOnEsc) {
      global.window.document.addEventListener('keydown', this.handleKeydown);
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
      global.window.document.removeEventListener('keydown', this.handleKeydown);
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

  handleKeydown = (e) => {
    if (e.keyCode === 27) {
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
        {this.props.closeButtonText}
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

    if (!active && !isOpen) {
      return null;
    }

    const rootMods = [];
    if (active) {
      rootMods.push('active');
    }
    if (isOpen) {
      rootMods.push('open');
    }
    if (fullscreen) {
      rootMods.push('fullscreen');
    }

    const className = getClassNamesWithMods('ui-modal', rootMods);
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
  active: PropTypes.bool,
  children: PropTypes.node,
  closable: PropTypes.bool,
  closeButtonText: PropTypes.node,
  closeOnEsc: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  footer: PropTypes.node,
  fullscreen: PropTypes.bool,
  onClose: PropTypes.func,
  onOverlayClick: PropTypes.func,
  overlay: PropTypes.bool,
  title: PropTypes.node,
};

export default Modal;
