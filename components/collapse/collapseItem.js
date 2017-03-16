import React, { PropTypes } from 'react';

/**
 * Collapse item component
 */
const CollapseItem = ({ id, expanded, name, title, children, type, onChange }) => (
  <div className="ui-collapse-item">
    <input
      className="ui-collapse-item__input"
      defaultChecked={expanded}
      id={id}
      name={name}
      onChange={onChange}
      type={type}
    />
    <label className="ui-collapse-item__label" htmlFor={id}>{title}</label>
    <div className="ui-collapse-item__content">
      {children}
    </div>
  </div>
);
CollapseItem.propTypes = {
  /**
   * The collapse should contains CollapseItem components
   */
  children: PropTypes.node.isRequired,
  /**
   * Unique id for input and label Unique id for input and label.
   */
  id: PropTypes.string,
  /**
   * Specify a function that will be called when a user click on CollapseItem
   */
  onChange: PropTypes.func,
  /**
   * The CollapseItem's title
   */
  title: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  /**
   * Determine whether a CollapseItem is collapsed or not by default
   */
  expanded: PropTypes.bool,
  /**
   * Determine type for input, can be one of ('radio', 'checkbox')
   */
  type: PropTypes.oneOf(['radio', 'checkbox']),
};
CollapseItem.defaultProps = {
  collapsed: false,
};

export default CollapseItem;
