// Imports
import PropTypes from 'prop-types';
import React from 'react';
import { getClassNamesWithMods } from '../_helpers';

/**
 * General List component. Use when you need to display array of elements
 */
function List(props) {
  const {
    align,
    hideBullets,
    items,
    renderEmptyItems,
  } = props;

  const mods = props.mods ? props.mods.slice() : [];

  mods.push(`align_${align}`);

  if (hideBullets) {
    mods.push("no-bullets");
  }

  const className = getClassNamesWithMods('ui-list', mods);

  const notEmpty = i => i !== '' && i !== null;

  const itemsToRender = (renderEmptyItems === false) ? items.filter(notEmpty) : items;

  const itemsBlock = itemsToRender.map((item, index) => (
    <li className="ui-list__item" key={index}>
      {item}
    </li>
  ));

  return (
    <ul className={className}>
      {itemsBlock}
    </ul>
  );
}

List.defaultProps = {
  align: 'vertical',
  hideBullets: false,
  renderEmptyItems: true,
};

List.propTypes = {
  /**
   * List's apperance.
   */
  align: PropTypes.oneOf(['vertical', 'horizontal']),

  /**
   * Hide list's bullets
   */
  hideBullets: PropTypes.bool,

  /**
   * List's elements.
   */
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ])).isRequired,

  /**
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),

  /**
   * Specify that should be empty items are rendered or hidden.
   */
  renderEmptyItems: PropTypes.bool,
};

export default List;
