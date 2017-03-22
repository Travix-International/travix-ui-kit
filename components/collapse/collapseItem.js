import React, { PropTypes } from 'react';

import { getClassNamesWithMods } from '../_helpers';

/**
 * Collapse item component
 */
const CollapseItem = ({ id, isActive, title, children, onClick }) => {
  const mods = {
    active: isActive,
  };
  const handleItemClick = e => onClick(e, id);
  return (
    <div className={getClassNamesWithMods('ui-collapse-item', mods)}>
      <button
        aria-controls={id}
        aria-expanded={isActive}
        className="ui-collapse__label"
        onClick={handleItemClick}
        type="button"
      >
        {title}
      </button>
      <div
        aria-hidden={!isActive}
        className="ui-collapse-item__content"
        id={id}
      >
        {children}
      </div>
    </div>
  );
};
CollapseItem.propTypes = {
  /**
   * The collapse should contains CollapseItem components
   */
  children: PropTypes.node.isRequired,
  /**
   * Determine whether a CollapseItem is collapsed or not by default
   */
  isActive: PropTypes.bool,
  /**
   * Unique id for input and label Unique id for input and label.
   */
  id: PropTypes.string,
  /**
   * Specify a function that will be called when a user click on CollapseItem
   */
  onClick: PropTypes.func,
  /**
   * The CollapseItem's title
   */
  title: PropTypes.node.isRequired,
};
CollapseItem.defaultProps = {
  collapsed: false,
};

export default CollapseItem;
