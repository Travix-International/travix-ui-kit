import React, { PropTypes } from 'react';

import { getClassNamesWithMods } from '../_helpers';

/**
 * Badge component
 */
const Badge = ({ arrow, border, children, mods, position, title, ...otherProps }) => {
  if (!children && !title) {
    return <noscript />;
  }

  let badge = null;

  if (title) {
    const badgeMods = {
      'arrow-left': arrow && position === 'right',
      'arrow-right': arrow && position === 'left',
      'no-border': !border,
    };

    if (position && children) {
      badgeMods[position] = true;
    }

    badge = (
      <div {...otherProps} className={getClassNamesWithMods('ui-badge-badge', mods, badgeMods)}>
        {title}
        {arrow && (position === 'right' || position === 'left') ? <span className="ui-badge-badge-arrow" /> : null}
      </div>
    );
  }

  if (!children) {
    return badge;
  }

  return (
    <div className={getClassNamesWithMods('ui-badge', mods)}>
      {children}
      {badge}
    </div>
  );
};

Badge.propTypes = {
  /**
   * Does the Badge have an arrow
   */
  arrow: PropTypes.bool,
  /**
   * Does the Badge have a bottom border
   */
  border: PropTypes.bool,
  /**
   * Content, that will be wrapped by Badge
   */
  children: PropTypes.node,
  /**
   * Set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  /**
   * The Badge's position
   */
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /**
   * The Badge's title
   */
  title: PropTypes.string,
};

Badge.defaultProps = {
  arrow: false,
  border: true,
  children: null,
  mods: [],
  title: '',
};

export default Badge;
