import React, { Component, PropTypes } from 'react';

import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

/**
 * AutoCompleteItem component
 */
class AutoCompleteItem extends Component {
  handleItemClick = (e) => {
    const { onClick } = this.props;

    if (typeof onClick === 'function') {
      onClick(e, this.getValue());
    }
  };

  getValue() {
    const { index, value, code } = this.props;
    const itemData = { index, value };
    if (code !== undefined) {
      itemData.code = code;
    }

    return itemData;
  }

  render() {
    const {
      children,
      dataAttrs = {},
      onClick,
      isActive,
      isTitle,
      ...otherProps
    } = this.props;
    const mods = this.props.mods ? this.props.mods.slice() : [];

    isTitle && mods.push('title');
    isActive && mods.push('active');
    const className = getClassNamesWithMods('ui-autocomplete-item', mods);

    return (
      <li
        {...getDataAttributes(dataAttrs)}
        {...otherProps}
        className={className}
        onClick={!isTitle && this.handleItemClick}
        role="listitem"
        role="option"
        tabIndex="-1"
      >
        {children}
      </li>
    );
  }
}

AutoCompleteItem.defaultProps = {
  isActive: false,
  isTitle: false,
};

AutoCompleteItem.propTypes = {
  /**
   * The data for autocomplet item.
   */
  children: PropTypes.node.isRequired,
  /**
   * Code of the item.
   */
  code: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * Data attribute. You can use it to set up GTM key or any custom data-* attribute.
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /**
   * Index of the item.
   */
  index: PropTypes.number,
  /**
   * Is item active.
   */
  isActive: PropTypes.bool,
  /**
   * Is item has title mode.
   */
  isTitle: PropTypes.bool,
  /**
   * Set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  /**
   * Function to be triggered when the autocomplete item is selected.
   */
  onClick: PropTypes.func,
  /**
   * Value of the item.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default AutoCompleteItem;
