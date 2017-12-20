import PropTypes from 'prop-types';
import React, {
  Component,
  Children,
  cloneElement,
  isValidElement,
} from 'react';

import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

const getNormalizedActiveKey = ({ defaultActiveKey, activeKey }) => {
  if (typeof activeKey === 'undefined') {
    if (typeof defaultActiveKey !== 'undefined') {
      return getNormalizedActiveKey({ activeKey: defaultActiveKey });
    }
    return [];
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
      this.props.onChange(this.props.isAccordion ? activeKey[0] : activeKey);
    }
  }

  renderItems() {
    const { isAccordion, children, iconPosition } = this.props;
    const { activeKey } = this.state;

    return (
      Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return null;
        }

        const key = typeof child.props.id !== 'undefined'
          ? child.props.id
          : (child.key || `ui-collapse-item.${index}`);
        const isActive = isAccordion ? activeKey[0] === key : activeKey.indexOf(key) >= 0;
        return cloneElement(child, {
          id: key,
          isActive,
          iconPosition,
          onClick: this.handleItemClick,
        });
      })
    );
  }

  render() {
    const {
      isAccordion,
      children,
      mods = [],
      dataAttrs,
    } = this.props;

    if (Children.count(children) === 0) {
      return null;
    }

    const collapseMods = {
      accordion: isAccordion,
    };

    return (
      <div {...getDataAttributes(dataAttrs)} className={getClassNamesWithMods('ui-collapse', mods, collapseMods)}>
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
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
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
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /**
   * Determine on which side of the block the icon is shown. On the left by default
   */
  iconPosition: PropTypes.oneOf(['right', 'left']),
  /**
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  /**
   * Specify a function that will be called when a user click on CollapseItem
   */
  onChange: PropTypes.func,
  /**
   * Data attributes. You can use it to set up any custom data-* attribute
   */
  dataAttrs: PropTypes.object,
};

Collapse.defaultProps = {
  children: null,
  isAccordion: false,
  iconPosition: 'left',
};

export default Collapse;
