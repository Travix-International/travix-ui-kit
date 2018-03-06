import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const ModalContent = ({ children, className, title, subtitle }) => {
  const titleDescription = subtitle && <div className="ui-modal-content-block__subtitle">{subtitle}</div>;
  const header = title &&
    (
      <div className="ui-modal-content-block__title-block">
        <div className="ui-modal-content-block__title">
          {title}
        </div>
        {titleDescription}
      </div>
    );

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
  /**
   * Subtitle text of content
   */
  subtitle: PropTypes.node,
};

export default ModalContent;
