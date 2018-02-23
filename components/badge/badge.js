import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import { getClassNamesWithMods, getDataAttributes, warnAboutDeprecatedProp } from '../_helpers';

/**
 * Badge component
 */
const Badge = (props) => {
  warnAboutDeprecatedProp(props.mods, 'mods', 'className');

  const {
    arrow,
    border,
    children,
    className,
    dataAttrs = {},
    mods = [],
    position,
    title,
    visible,
  } = props;

  if (!children && !title) {
    return null;
  }

  // For the bottom badge we have default alignment is the `end`, for other positions it should be `start`.
  const align = props.align || (position === 'bottom' ? 'end' : 'start');

  const dataAttributes = getDataAttributes(dataAttrs);

  let badge = null;

  if (title) {
    const badgeMods = {
      'arrow-left': arrow && position === 'right',
      'arrow-right': arrow && position === 'left',
      'no-border': !border,
      [align]: true,
    };

    if (position && children) {
      badgeMods[position] = true;
    }

    badge = visible ? (
      <div
        {...dataAttributes}
        className={classnames(className, getClassNamesWithMods('ui-badge-badge', mods, badgeMods))}
      >
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
   * Alignment relatively the `position` prop [start|center|end]
   * `start` means left for `top` and `bottom` positions. Also it means top for `left` and `right` positions.
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),
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
   * Specify a CSS class
   */
  className: PropTypes.string,
  /**
   * Data attribute. You can use it to set up any custom data-* attribute.
   */
  dataAttrs: PropTypes.object,
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
  title: '',
  visible: true,
};

export default Badge;
