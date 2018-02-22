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
    centered,
    children,
    className,
    dataAttrs = {},
    mods = [],
    position,
    reversed,
    title,
    visible,
  } = props;

  if (!children && !title) {
    return null;
  }

  const dataAttributes = getDataAttributes(dataAttrs);

  let badge = null;

  if (title) {
    const badgeMods = {
      'arrow-left': arrow && position === 'right',
      'arrow-right': arrow && position === 'left',
      'no-border': !border,
      centered,
      'reversed': !centered && reversed,
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
   * Does the Badge have an arrow
   */
  arrow: PropTypes.bool,
  /**
   * Does the Badge have a bottom border
   */
  border: PropTypes.bool,
  /**
   * Define if badge should be centered instead of showing on default position
   */
  centered: PropTypes.bool,
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
   * Define if we want to show the badge on the opposite side.
   * For example, for top position we show badge in left corner by default.
   * With this prop we are able to show it in the right corner instead.
   * This prop is not working if component has the prop `centered`.
   */
  reversed: PropTypes.bool,
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
  centered: false,
  children: null,
  title: '',
  visible: true,
};

export default Badge;
