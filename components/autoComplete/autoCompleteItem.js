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
      mods = [],
      onClick,
      isActive,
      isTitle,
      ...otherProps
    } = this.props;

    isTitle && mods.push('title');
    isActive && mods.push('active');
    const className = getClassNamesWithMods('ui-autocomplete-item', mods);

    return (
      <li
        {...getDataAttributes(dataAttrs)}
        {...otherProps}
        className={className}
        onClick={!isTitle && this.handleItemClick}
      >
        {children}
      </li>
    );
  }
}

export default AutoCompleteItem;
