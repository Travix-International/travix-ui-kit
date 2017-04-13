import React, { Component, PropTypes } from 'react';

import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

/**
 * AutoCompleteItem component
 */
class AutoCompleteItem extends Component {
  handleItemClick = (e) => {
    const { index, onClick, source } = this.props;

    if (typeof onClick === 'function') {
      onClick(e, source, index);
    }
  };

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
