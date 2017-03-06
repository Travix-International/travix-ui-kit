// Imports
import React, { Component, PropTypes } from 'react';

/**
 * ModalHeader component
 */
class ModalHeader extends Component {
  render() {
    const { children } = this.props;
    return (
      <header className={'ui-modal__header'}>
        {children}
      </header>
    );
  }
}

ModalHeader.defaultProps = {
  children: null,
};

ModalHeader.propTypes = {
  /**
   * Header Content.
   */
  children: PropTypes.node,
};

export default ModalHeader;
