// Imports
import React, { Component, PropTypes } from 'react';

/**
 * ModalFooter component
 */
class ModalContent extends Component {
  render() {
    const { children } = this.props;
    return (
      <section className={'ui-modal__content'}>
        {children}
      </section>
    );
  }
}

ModalContent.defaultProps = {
  children: null,
};

ModalContent.propTypes = {
  /**
   * Modal Content.
   */
  children: PropTypes.node,
};

export default ModalContent;
