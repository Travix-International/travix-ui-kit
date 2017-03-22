import React, { Component, PropTypes } from 'react';

import { getClassNamesWithMods } from '../_helpers';

/**
 * Collapse item component
 */
class CollapseItem extends Component {
  handleItemClick = (e) => {
    const { onClick, id } = this.props;

    if (typeof onClick === 'function') {
      onClick(e, id);
    }
  };

  render() {
    const { id, isActive, title, children } = this.props;
    const mods = {
      active: isActive,
    };
    return (
      <div className={getClassNamesWithMods('ui-collapse-item', mods)}>
        <button
          aria-controls={id}
          aria-expanded={isActive}
          className="ui-collapse__label"
          onClick={this.handleItemClick}
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
  }
 }

CollapseItem.propTypes = {
  /**
   * The collapse should contains CollapseItem components
   */
  children: PropTypes.node.isRequired,
  /**
   * Determine whether a CollapseItem is collapsed or not
   */
  isActive: PropTypes.bool,
  /**
   * Unique id for collapse item.
   */
  id: PropTypes.string,
  /**
   * Specify a function that will be called when a user click on label
   */
  onClick: PropTypes.func,
  /**
   * The CollapseItem's title
   */
  title: PropTypes.node.isRequired,
};

CollapseItem.defaultProps = {
  id: null,
  isActive: false,
  onClick: null,
};

export default CollapseItem;
