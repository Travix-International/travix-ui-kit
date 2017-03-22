import React, {
  Component,
  Children,
  cloneElement,
  PropTypes,
} from 'react';

import CollapseItem from './collapseItem';

const getNormalizedActiveKey = ({ activeKey }) => {
  return activeKey instanceof Array ? activeKey : [activeKey];
};

class Collapse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: getNormalizedActiveKey(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      this.setState({
        activeKey: getNormalizedActiveKey(nextProps),
      });
    }
  }

  handleItemClick = (e, key) => {
    const { isAccordion } = this.props;
    let { activeKey } = this.state;

    if (isAccordion) {
      activeKey = activeKey[0] === key ? [] : [key];
    } else {
      activeKey = [...activeKey];
      const index = activeKey.indexOf(key);

      if (index >= 0) {
        activeKey.splice(index, 1);
      } else {
        activeKey.push(key);
      }
    }
    this.setActiveKey(activeKey);
  }

  setActiveKey(activeKey) {
    if (!('activeKey' in this.props)) {
      this.setState({ activeKey });
    }
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.props.isAccordion ? (activeKey[0] || null) : activeKey);
    }
  }

  renderItems() {
    const { isAccordion, children } = this.props;
    const { activeKey } = this.state;

    return (
      Children.map(children, (child, index) => {
        if (!child || child.type !== CollapseItem) {
          return null;
        }

        const key = child.props.id || child.key || `ui-collapse-item.${index}`;
        const isActive = isAccordion ? activeKey[0] === key : activeKey.indexOf(key) >= 0;
        return cloneElement(child, {
          id: key,
          isActive,
          onClick: this.handleItemClick,
        });
      })
    );
  }

  render() {
    if (Children.count(this.props.children) === 0) {
      return null;
    }

    return (
      <div className="ui-collapse">
        {this.renderItems()}
      </div>
    );
  }
}

Collapse.propTypes = {
  /**
   * Accordion mode, only one panel can be expanded at a time.
   */
  isAccordion: PropTypes.bool,

  activeKey: PropTypes.string,
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
