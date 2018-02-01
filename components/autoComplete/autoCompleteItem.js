import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';

import {
  getClassNamesWithMods,
  getDataAttributes,
  warnAboutDeprecatedProp,
} from '../_helpers';

/**
 * AutoCompleteItem component
 */
class AutoCompleteItem extends Component {
  componentWillMount() {
    warnAboutDeprecatedProp(this.props.mods, 'mods', 'className');
  }

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
      className,
      dataAttrs = {},
      isActive,
      isTitle,
    } = this.props;
    const mods = this.props.mods ? this.props.mods.slice() : [];

    isTitle && mods.push('title');
    isActive && mods.push('active');

    const classNames = classnames(
      getClassNamesWithMods('ui-autocomplete-item', mods),
      className
    );

    return (
      <li
        {...getDataAttributes(dataAttrs)}
        className={classNames}
        onClick={!isTitle ? this.handleItemClick : undefined}
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
   * Custom className.
   */
  className: PropTypes.string,
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
