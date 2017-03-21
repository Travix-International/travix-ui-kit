import React, { PropTypes } from 'react';

/**
 * Collapse item component
 */
const CollapseItem = ({ id, expanded, name, title, children, isAccordion, onChange }) => {
  const type = isAccordion ? 'radio' : 'checkbox';
  return (
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
};
CollapseItem.propTypes = {
  /**
   * Accordion mode, only one panel can be expanded at a time.
   */
  isAccordion: PropTypes.bool,
  /**
   * The collapse should contains CollapseItem components
   */
  children: PropTypes.node.isRequired,
  /**
   * Determine whether a CollapseItem is collapsed or not by default
   */
  expanded: PropTypes.bool,
  /**
   * Unique id for input and label Unique id for input and label.
   */
  id: PropTypes.string,
  /**
   * The CollapseItem input name
   */
  name: PropTypes.string,
  /**
   * Specify a function that will be called when a user click on CollapseItem
   */
  onChange: PropTypes.func,
  /**
   * The CollapseItem's title
   */
  title: PropTypes.node.isRequired,
};
CollapseItem.defaultProps = {
  collapsed: false,
};

export default CollapseItem;
