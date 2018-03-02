import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export default function ToggleItem(props) {
  const {
    children,
    active,
    handleClick,
  } = props;

  const classes = classnames(
    'ui-toggle-button__item',
    { active }
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
   * Custom className(s) to be concatenated with the default ones
   * on the component's root element
   */
  active: PropTypes.bool,

  /**
   * List of toggleItems elements
   */
  children: PropTypes.node,

  /**
   * Specify a function that will be called when a user clicked on a given option.
   */
  handleClick: PropTypes.func.isRequired,
};
