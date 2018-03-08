import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const ModalContent = ({ children, className, title }) => {
  const header = title
    ? (
      <div className="ui-modal-content-block__title">
        {title}
      </div>
    )
    : null;

  const classes = classnames(className, 'ui-modal-content-block');
  return (
    <section className={classes}>
      {header}
      <div className="ui-modal-content-block__container">
        {children}
      </div>
    </section>
  );
};

ModalContent.propTypes = {
  /**
   * Specify a CSS class
   */
  className: PropTypes.string,
  /**
   * The modal dialog's body
   */
  children: PropTypes.node,
  /**
   * Title text of content
   */
  title: PropTypes.node,
};

export default ModalContent;
