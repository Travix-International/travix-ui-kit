import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { getDataAttributes } from '../../_helpers';

const renderDefaultLeftBlock = (backButtonLabel, onBackButtonClick) => (
  <button
    className="ui-sliding-panel-header__left-block-back"
    onClick={onBackButtonClick}
  >
    <span className="ui-sliding-panel-header__left-block-back-icon" />

    { backButtonLabel && (
      <span className="ui-sliding-panel-header__left-block-back-text">
        {backButtonLabel}
      </span>
    ) }
  </button>
);

const SlidingPanelHeader = ({
  backButtonLabel,
  children,
  className,
  dataAttrs,
  leftBlock,
  onBackButtonClick,
  rightBlock,
  useDefaultLeftBlock,
}) => {
  if (!children) {
    return null;
  }

  const headerClassName = classnames('ui-sliding-panel-header', className);

  const headerLeftBlock = useDefaultLeftBlock
    ? renderDefaultLeftBlock(backButtonLabel, onBackButtonClick)
    : leftBlock;

  const defaultCloseButton = (
    <button
      className="ui-sliding-panel-header__close-button"
      data-rel="close"
    >
      &#215;
    </button>
  );

  return (
    <div
      className={headerClassName}
      {...getDataAttributes(dataAttrs)}
    >
      <div className="ui-sliding-panel-header__left-block">
        {headerLeftBlock}
      </div>

      <h3 className="ui-sliding-panel-header__title">
        {children}
      </h3>

      <div className="ui-sliding-panel-header__right-block">
        {rightBlock || defaultCloseButton}
      </div>
    </div>
  );
};

SlidingPanelHeader.propTypes = {
  /**
   * The text for default back button that will appear near the arrow icon
   */
  backButtonLabel: PropTypes.node,

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

  /**
   * When defined, this custom node appears on the left part of the header
   */
  leftBlock: PropTypes.node,

  /**
   * Callback for back button
   */
  onBackButtonClick: PropTypes.func,

  /**
   * When defined, this custom node appears on the right part of the header
   */
  rightBlock: PropTypes.node,

  /**
   * When true, it will show the block with arrow icon and passed text (optional).
   * You can either enable it, or use leftBlock property to have more customization.
   */
  useDefaultLeftBlock: PropTypes.bool,
};

SlidingPanelHeader.defaultProps = {
  useDefaultLeftBlock: false,
};

export default SlidingPanelHeader;
