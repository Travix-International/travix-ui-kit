import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getClassNamesWithMods,
  getDataAttributes,
  ejectOtherProps,
  warnAboutDeprecatedProp,
} from '../_helpers';

const Card = (props) => {
  warnAboutDeprecatedProp(props.mods, 'mods', 'className');

  const {
    checked,
    children,
    className,
    dataAttrs,
    hovering,
    mods = [],
    onClick,
    showIcon,
    tag,
    transparent,
    ...other
  } = props;
  const otherProps = ejectOtherProps(other, Card.propTypes);
  const cardMods = {
    checked,
    transparent,
    hovering,
    clickable: typeof onClick === 'function',
    'show-icon': showIcon,
  };
  const Tag = tag;

  return (
    <Tag
      className={classnames(className, getClassNamesWithMods('ui-card', cardMods, mods))}
      onClick={onClick}
      {...getDataAttributes(dataAttrs)}
      {...otherProps}
    >
      {children}
    </Tag>
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
  /**
   * Whether to enable hover effect on mouse over
   */
  hovering: PropTypes.bool,
  /**
   * Set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  /**
   * The callback for onClick event
   */
  onClick: PropTypes.func,
  /**
   * Set of custom tag.
   */
  tag: PropTypes.string,
  /**
   * Whether to use background or not
   */
  transparent: PropTypes.bool,
  /**
   * Whether to show icon or not
   */
  showIcon: PropTypes.bool,
};

Card.defaultProps = {
  className: null,
  dataAttrs: null,
  hovering: false,
  onClick: null,
  tag: 'div',
  transparent: false,
  showIcon: false,
};
export default Card;
