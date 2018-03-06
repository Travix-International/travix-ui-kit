import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { cloneElement, Children } from 'react';
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
    (!Array.isArray(children) || children.length < 2)
  ) {
    return null;
  }

  const handleOnClick = (e, index) => {
    e.stopPropagation();
    handleSelect(e, index);
  };

  const classes = classnames(
    getClassNamesWithMods('ui-toggle-button', mods),
    className,
  );

  let listItems;

  if (children) {
    listItems = Children.map(children, (child, childIndex) => {
      const active = childIndex === selectedIndex;
      const childHandleClick = e => handleOnClick(e, childIndex);

      return cloneElement(child, {
        active,
        handleClick: childHandleClick,
      });
    });
  } else {
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

  return (
    <ul className={classes} {...getDataAttributes(dataAttrs)}>
      {listItems}
    </ul>
  );
}

ToggleButton.defaultProps = {
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
  children: PropTypes.arrayOf(
    PropTypes.shape({ type: ToggleItem })
  ),

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
  handleSelect: PropTypes.func.isRequired,

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
