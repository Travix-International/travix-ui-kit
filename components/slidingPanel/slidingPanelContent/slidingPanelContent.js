import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { getDataAttributes } from '../../_helpers';

const SlidingPanelContent = ({ children, className, dataAttrs }) => (
  <div
    className={classNames('ui-sliding-panel__content', className)}
    {...getDataAttributes(dataAttrs)}
  >
    {children}
  </div>
);

SlidingPanelContent.propTypes = {
  /**
   * Content, that will be wrapped by SlidingPanel
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

  /**
   * Attribute used to set specific classes
   */
  className: PropTypes.string,

  /**
   * Data attributes. You can use it to set up any custom data-* attribute
   */
  dataAttrs: PropTypes.object,
};

export default SlidingPanelContent;
