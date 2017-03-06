// Imports
import React, { Component, PropTypes } from 'react';

/**
 * ModalFooter component
 */
class ModalFooter extends Component {
  render() {
    const { children } = this.props;
    return (
      <footer className={'ui-modal__footer'}>
        {children}
      </footer>
    );
  }
}

ModalFooter.defaultProps = {
  children: null,
};

ModalFooter.propTypes = {
  /**
   * Header Content.
   */
  children: PropTypes.node,
};

export default ModalFooter;
