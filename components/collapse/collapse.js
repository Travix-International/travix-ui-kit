import React, {
  Children,
  cloneElement,
  Component,
  PropTypes,
} from 'react';

import CollapseItem from './collapseItem';

/**
 * Collapse component
 */
class Collapse extends Component {
  render() {
    const { onChange, isAccordion, name, children } = this.props;

    if (Children.count(children) === 0) {
      return null;
    }

    return (
      <div className="ui-collapse">
        {Children.map(children, (child, index) => {
          if (child.type !== CollapseItem) {
            return null;
          }

          return cloneElement(child, {
            isAccordion,
            id: child.props.id || `${name}.${index}`,
            name,
            onChange,
          });
        })}
      </div>
    );
  }
}

Collapse.propTypes = {
  /**
   * Accordion mode, only one panel can be expanded at a time.
   */
  isAccordion: PropTypes.bool,
  /**
   * Unique name for Collapse component.
   */
  name: PropTypes.string.isRequired,
  /**
   * The list of CollapseItem components
   */
  children: PropTypes.node,
  /**
   * Specify a function that will be called when a user click on CollapseItem
   */
  onChange: PropTypes.func,
};

Collapse.defaultProps = {
  isAccordion: false,
  children: null,
};

export default Collapse;
