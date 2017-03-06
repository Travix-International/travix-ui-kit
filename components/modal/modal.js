// Imports
import React, { Component, PropTypes } from 'react';

import Global from '../global';
import ModalHeader from './modalHeader';
import ModalFooter from './modalFooter';
import ModalContent from './modalContent';
import { getClassNamesWithMods } from '../_helpers';

/**
 * Modal component
 */
class Modal extends Component {
  renderHeader() {
    const { title } = this.props;
    return (
      <ModalHeader>
        <h3>{title}</h3>
      </ModalHeader>
    );
  }

  renderContent() {
    const { children } = this.props;
    return (
      <ModalContent>
        {children}
      </ModalContent>
    );
  }

  renderFooter() {
    return (
      <ModalFooter>
        Footer
      </ModalFooter>
    );
  }

  renderCloseButton() {
    if (!this.props.closable) return null;

    return (
      <button className="ui-modal__close-button" type="button">Close</button>
    );
  }

  render() {
    const { active } = this.props;
    const rootMods = [];
    if (active) {
      rootMods.push('active');
    }
    const className = getClassNamesWithMods('ui-modal', rootMods);

    return (
      <Global className={className}>
        <div className={'ui-modal__container'}>
          {this.renderCloseButton()}
          {this.renderHeader()}
          {this.renderContent()}
          {this.renderFooter()}
        </div>
      </Global>
    );
  }
}

Modal.defaultProps = {
  visible: false,
  children: null,
  closable: true,
};

Modal.propTypes = {
  /**
   * Determine the modal dialog is visible or not
   */
  active: PropTypes.bool,
  closable: PropTypes.bool,

  title: PropTypes.node,

  /**
   * Content.
   */
  children: PropTypes.node,
};

export default Modal;
