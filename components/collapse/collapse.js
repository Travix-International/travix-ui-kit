import React, { Component, PropTypes } from 'react';

class Collapse extends Component {
  render() {
    const { onChange, accordion, name, children } = this.props;
    const type = accordion ? 'radio' : 'checkbox';
    return (
      <div className="ui-collapse">
        {React.Children.map(children, (child, index) => (
          React.cloneElement(child, {
            id: child.props.id || `${name}.${index}`,
            type,
            name,
            onChange,
          })
        ))}
      </div>
    );
  }
}

Collapse.propTypes = {
  accordion: PropTypes.bool,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  onChange: PropTypes.func,
};
Collapse.defaultProps = {
  children: null,
  accordion: false,
};

export default Collapse;
