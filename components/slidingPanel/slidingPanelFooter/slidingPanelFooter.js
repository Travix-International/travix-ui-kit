import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { getDataAttributes } from '../../_helpers';

const SlidingPanelFooter = ({ children, className, dataAttrs }) => (
  <div
    className={classNames('ui-sliding-panel__footer', className)}
    {...getDataAttributes(dataAttrs)}
  >
    {children}
  </div>
);

SlidingPanelFooter.propTypes = {
  /**
   * Content, that will be wrapped by SlidingPanel
   */
  children: PropTypes.node.isRequired,

  /**
   * Attribute used to set specific classes
   */
  className: PropTypes.string,

  /**
   * Data attributes. You can use it to set up any custom data-* attribute
   */
  dataAttrs: PropTypes.object,
};

export default SlidingPanelFooter;
