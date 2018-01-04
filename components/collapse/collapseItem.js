import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';

import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

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
    const {
      className,
      id,
      isActive,
      title,
      children,
      iconPosition,
      dataAttrs,
      labelDataAttrs,
    } = this.props;

    const mods = {
      active: isActive,
    };

    const classNames = classnames(getClassNamesWithMods('ui-collapse-item', mods), className);

    return (
      <div
        {...getDataAttributes(dataAttrs)}
        className={classNames}
      >
        <button
          {...getDataAttributes(labelDataAttrs)}
          aria-controls={id}
          aria-expanded={isActive}
          className={
            `ui-collapse__label ${getClassNamesWithMods('ui-collapse__label--icon_position', [iconPosition])}`
          }
          onClick={this.handleItemClick}
          type="button"
        >
          <span className="ui-collapse__label-icon"/>
          <span className="ui-collapse__label-text">{title}</span>
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
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * Specify a function that will be called when a user click on label
   */
  onClick: PropTypes.func,
  /**
   * The CollapseItem's title
   */
  title: PropTypes.node.isRequired,
  /**
   * Determine on which side of the block the icon is shown. On the left by default
   */
  iconPosition: PropTypes.oneOf(['right', 'left']),
  /**
   * Data attributes. You can use it to set up any custom data-* attribute
   */
  dataAttrs: PropTypes.object,
  /**
   * Data attributes for header label. You can use it to set up any custom data-* attribute
   */
  labelDataAttrs: PropTypes.object,
  /**
   * Custom className.
   */
  className: PropTypes.string,
};

CollapseItem.defaultProps = {
  isActive: false,
  iconPosition: 'left',
  onClick: null,
};

export default CollapseItem;
