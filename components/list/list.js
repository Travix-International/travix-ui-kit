// Imports
import React, { PropTypes } from 'react';
import { getClassNamesWithMods } from '../_helpers';

/**
 * General List component. Use when you need to display array of elements
 */
function List({ items, hideBullets, mods = [], orientation }) {
  mods.push(`orientation_${orientation}`);

  if (hideBullets) {
    mods.push("no-bullets");
  }

  const className = getClassNamesWithMods('ui-list', mods);

  const itemsBlock = items.map((item, index) => (
    <li key={index}>
      <span className="ui-list__content">{item}</span>
    </li>
  ));

  return (
    <ul className={className}>
      {itemsBlock}
    </ul>
  );
}

List.defaultProps = {
  hideBullets: false,
  orientation: 'vertical',
};

List.propTypes = {
  /**
   * List's elements.
   */
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ])).isRequired,

  /**
   * Hide list's bullets
   */
  hideBullets: PropTypes.bool,

  /**
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),

  /**
   * List's apperance.
   */
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
};

export default List;
