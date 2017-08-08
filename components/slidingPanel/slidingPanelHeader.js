import React from 'react';
import PropTypes from 'prop-types';

const SlidingPanelHeader = ({ title }) => {
  if (!title) {
    return <noscript />;
  }

  return (
    <div className="ui-sliding-panel-header">
      <h3 className="ui-sliding-panel-header__title">
        {title}
      </h3>
      <button
        className="ui-sliding-panel-header__close-button"
        rel="close"
      >
        &#215;
      </button>
    </div>
  );
};

SlidingPanelHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SlidingPanelHeader;
