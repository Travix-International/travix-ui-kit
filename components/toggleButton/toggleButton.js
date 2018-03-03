import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import { getClassNamesWithMods, getDataAttributes, warnAboutDeprecatedProp } from '../_helpers';
import ToggleItem from './toggleItem';

export default function ToggleButton(props) {
  warnAboutDeprecatedProp(props.mods, 'mods', 'className');
  warnAboutDeprecatedProp(props.items, 'items', 'children');

  const {
    children,
    className,
    dataAttrs,
    mods = [],
    handleSelect,
    items,
    selectedIndex,
  } = props;

  if (
    (!Array.isArray(items) || items.length < 2) &&
    !children
  ) {
    return null;
  }

  const handleOnClick = (e, index) => {
    e.stopPropagation();

    if (handleSelect) {
      handleSelect(e, index);
    }
  };

  const classes = classnames(
    getClassNamesWithMods('ui-toggle-button', mods),
    className,
  );

  let listItems;
  if (items) {
    listItems = items.map((item, itemIndex) => {
      const active = itemIndex === selectedIndex;
      const itemHandleClick = e => handleOnClick(e, itemIndex);

      return (
        <ToggleItem
          active={active}
          handleClick={itemHandleClick}
          key={itemIndex}
        >
          { item }
        </ToggleItem>
      );
    });
  }

  if (children) {
    listItems = React.Children.map(children, (child, childIndex) => {
      const active = childIndex === selectedIndex;
      const childHandleClick = e => handleOnClick(e, childIndex);

      return cloneElement(child, {
        active,
        key: childIndex,
        handleClick: childHandleClick,
      });
    });
  }

  return (
    <ul className={classes} {...getDataAttributes(dataAttrs)}>
      {listItems}
    </ul>
  );
}

ToggleButton.defaultProps = {
  items: [],
  selectedIndex: 0,
};

ToggleButton.propTypes = {
  /**
   * Custom className(s) to be concatenated with the default ones
   * on the component's root element
   */
  className: PropTypes.string,

  /**
   * List of toggleItems elements
   */
  children: PropTypes.node,

  /**
   * Data attribute. You can use it to set up GTM key or any custom data-* attribute.
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),

  /**
   * Specify a function that will be called when a user clicked on a given option.
   */
  handleSelect: PropTypes.func,

  /**
   * List's elements.
   */
  items: PropTypes.arrayOf(PropTypes.string),

  /**
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),

  /**
   * Specifies which item of the provided list is selected when **mounting**. By default is 0.
   */
  selectedIndex: PropTypes.number,
};
