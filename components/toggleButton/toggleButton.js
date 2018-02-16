import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { getClassNamesWithMods, getDataAttributes, warnAboutDeprecatedProp } from '../_helpers';

export default function ToggleButton(props) {
  warnAboutDeprecatedProp(props.mods, 'mods', 'className');

  const {
    className,
    dataAttrs,
    mods = [],
    handleSelect,
    items,
    selectedIndex,
  } = props;

  if (!Array.isArray(items) || items.length < 2) {
    return null;
  }
  const classes = classnames(
    getClassNamesWithMods('ui-toggle-button', mods),
    className,
  );

  /** Generating the <li> tags */
  const listItems = items.map((item, itemIndex) => {
    const itemClasses = getClassNamesWithMods('ui-toggle-button__item', { 'active': itemIndex === selectedIndex });
    const handleOnClick = (e) => {
      e.stopPropagation();

      if (handleSelect) {
        handleSelect(e, itemIndex);
      }
    };

    return <li className={itemClasses} key={itemIndex} onClick={handleOnClick}>{item}</li>;
  });

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
