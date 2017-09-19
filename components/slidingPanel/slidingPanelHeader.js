import PropTypes from 'prop-types';
import React from 'react';

const SlidingPanelHeader = ({ title, leftBlock, rightBlock }) => {
  if (!title) {
    return <noscript />;
  }

  const defaultCloseButton = (
    <button
      className="ui-sliding-panel-header__close-button"
      data-rel="close"
    >
      &#215;
    </button>
  );

  const left = leftBlock
    ? (
      <div className="ui-sliding-panel-header__left-block">
        {leftBlock}
      </div>
    )
    : null;

  const right = rightBlock
    ? (
      <div className="ui-sliding-panel-header__right-block">
        {rightBlock}
      </div>
    )
    : defaultCloseButton;

  return (
    <div className="ui-sliding-panel-header">
      {left}
      <h3 className="ui-sliding-panel-header__title">
        {title}
      </h3>
      {right}
    </div>
  );
};

SlidingPanelHeader.propTypes = {
  title: PropTypes.string.isRequired,
  leftBlock: PropTypes.node,
  rightBlock: PropTypes.node,
};

export default SlidingPanelHeader;
