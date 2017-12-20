import PropTypes from 'prop-types';
import React from 'react';

import { getClassNamesWithMods } from '../_helpers';

/**
 * Badge component
 */
const Badge = ({ arrow, border, children, mods, position, title, visible }) => {
  if (!children && !title) {
    return null;
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

    badge = visible ? (
      <div className={getClassNamesWithMods('ui-badge-badge', mods, badgeMods)}>
        {title}
        {border && <div className="ui-badge__border" />}
        {arrow && (position === 'right' || position === 'left') ? <span className="ui-badge-badge-arrow" /> : null}
      </div>
    ) : null;
  }

  if (!children) {
    return badge;
  }

  return (
    <div className={getClassNamesWithMods('ui-badge', { visible }, mods)}>
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
  title: PropTypes.node,
  /**
   * Determine whether a badge is visible or not
   */
  visible: PropTypes.bool,
};

Badge.defaultProps = {
  arrow: false,
  border: true,
  children: null,
  mods: [],
  title: '',
  visible: true,
};

export default Badge;
