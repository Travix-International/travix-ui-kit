import React, {
  Component,
  Children,
  cloneElement,
  PropTypes,
} from 'react';

import { getClassNamesWithMods } from '../_helpers';
import CollapseItem from './collapseItem';

const getNormalizedActiveKey = ({ defaultActiveKey, activeKey }) => {
  if (activeKey === undefined && defaultActiveKey) {
    return getNormalizedActiveKey({ activeKey: defaultActiveKey });
  }
  if (!activeKey) {
    activeKey = [];
  }
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
    const { isAccordion, children, labelPosition } = this.props;
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
          labelPosition,
          onClick: this.handleItemClick,
        });
      })
    );
  }

  render() {
    const {
      isAccordion,
      children,
      onChange, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;
    if (Children.count(children) === 0) {
      return null;
    }

    const mods = {
      accordion: isAccordion,
    };

    return (
      <div {...otherProps} className={getClassNamesWithMods('ui-collapse', mods)}>
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
  /**
   * Determine whether items is expanded. You need to provide `id` for `CollapseItem`
   */
  activeKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /**
   * The list of CollapseItem components
   */
  children: PropTypes.node,
  /**
   * Determine whether item is expanded by default
   */
  defaultActiveKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /**
   * Determine on which side of the block label is shown
   */
  labelPosition: PropTypes.oneOf(['right', 'left']),
  /**
   * Specify a function that will be called when a user click on CollapseItem
   */
  onChange: PropTypes.func,
};

Collapse.defaultProps = {
  children: null,
  isAccordion: false,
  labelPosition: 'left',
};

export default Collapse;
