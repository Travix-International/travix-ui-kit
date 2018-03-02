import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export default function ToggleItem(props) {
  const {
    children,
    className,
    active,
    handleClick,
  } = props;

  const classes = classnames(
    className,
    'ui-toggle-button__item',
    {
      'ui-toggle-button__item_active': active,
    }
  );

  return (
    <li className={classes} onClick={handleClick}>
      {children}
    </li>
  );
}

ToggleItem.defaultProps = {
  active: false,
};

ToggleItem.propTypes = {
  /**
   * Is item active.
   */
  active: PropTypes.bool,

  /**
   * Content that will be wrapped by ToggleItem
   */
  children: PropTypes.node,

  /**
   * Custom className(s) to be concatenated with the default ones
   * on the component's root element
   */
  className: PropTypes.string,

  /**
   * Specify a function that will be called when a user clicked on a given option.
   */
  handleClick: PropTypes.func.isRequired,
};
