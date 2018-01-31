import PropTypes from 'prop-types';
import React from 'react';


const ModalContent = ({ children, title }) => {
  const header = title
    ? (
      <div className="ui-modal-content-block__title">
        {title}
      </div>
    )
    : null;

  return (
    <section className="ui-modal-content-block">
      {header}
      <div className="ui-modal-content-block__container">
        {children}
      </div>
    </section>
  );
};

ModalContent.propTypes = {
  /**
   * The modal dialog's body
   */
  children: PropTypes.node,
  /**
   * Title text of content
   */
  title: PropTypes.node,
  /**
   * Set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
};

export default ModalContent;
