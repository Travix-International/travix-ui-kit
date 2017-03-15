import React, { PropTypes } from 'react';

const CollapseItem = ({ id, collapsed, name, title, children, type, onChange }) => (
  <div className="ui-collapse-item">
    <input
      className="ui-collapse-item__input"
      defaultChecked={collapsed}
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
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  title: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  collapsed: PropTypes.bool,
  type: PropTypes.oneOf(['radio', 'checkbox']),
};
CollapseItem.defaultProps = {
  collapsed: false,
};

export default CollapseItem;
