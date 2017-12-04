import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { getClassNamesWithMods, getDataAttributes, ejectOtherProps } from '../_helpers';

const Card = ({ className, children, checked, showIcon, transparent, hovering, mods, dataAttrs, ...props }) => {
  const otherProps = ejectOtherProps(props, Card.propTypes);
  const cardMods = {
    checked,
    transparent,
    hovering,
    'show-icon': showIcon,
  };

  return (
    <div
      className={classnames(className, getClassNamesWithMods('ui-card', cardMods, mods))}
      {...getDataAttributes(dataAttrs)}
      {...otherProps}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  /**
   * Determine whether a card is checked or not
   */
  checked: PropTypes.bool.isRequired,
  /**
   * Specify a CSS class
   */
  className: PropTypes.string,
  /**
   * The card's body
   */
  children: PropTypes.node,
  /**
   * Data attribute. You can use it to set up GTM key or any custom data-* attribute.
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  hovering: PropTypes.bool,
  /**
   * Set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  tag: PropTypes.string,
  transparent: PropTypes.bool,
  showIcon: PropTypes.bool,
};

Card.defaultProps = {
  className: null,
  dataAttrs: null,
  hovering: false,
  mods: [],
  tag: 'div',
  transparent: false,
  showIcon: false,
};
export default Card;
