import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Tab from './tab';
import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

/**
 * Tabs component
 */
class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.initValue,
    };
  }

  handleTabClick = (value) => {
    this.setState({ active: value });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  getChildrenContent() {
    const tabs = [];
    const contents = [];

    React.Children.forEach(this.props.children, (child, idx) => {
      if (child && child.type === Tab) {
        tabs.push(child);

        if (child.props.children) {
          const { isActive } = this.getTabInfo(child, idx);
          contents.push({ isActive, data: child.props.children });
        }
      }
    });

    return { tabs, contents };
  }

  getTabInfo(tab, idx) {
    const value = tab.props.value === undefined ? idx.toString() : tab.props.value;
    const isActive = tab.props.initValue === undefined && this.state.active === undefined
      ? idx === 0
      : value === this.state.active;

    return { value, isActive };
  }

  renderTabsNavigation(tabs) {
    return tabs.map((tab, idx) => {
      const { value, isActive } = this.getTabInfo(tab, idx);

      return React.cloneElement(tab, {
        active: isActive,
        children: null,
        key: idx,
        value,
        onClick: (event, val) => {
          this.handleTabClick(value);
          if (tab.props.onClick) { tab.props.onClick(event, val); }
        },
      });
    });
  }

  static renderTabsContent(contents) {
    if (!contents.length) {
      return null;
    }

    const items = contents.map((content, idx) => {
      const { isActive, data } = content;

      const classes = classnames({
        'ui-tabs__content-item': true,
        'ui-tabs__content-item_active': isActive,
      });

      return (
        <div className={classes} key={idx}>
          {data}
        </div>
      );
    });

    return (
      <div className="ui-tabs__content">
        {items}
      </div>
    );
  }

  render() {
    const { tabs, contents } = this.getChildrenContent();

    if (!tabs.length) {
      return null;
    }

    const {
      className,
      dataAttrs = {},
      mods = [],
      ...otherProps
    } = this.props;

    const classes = classnames(
      getClassNamesWithMods('ui-tabs', mods),
      className
    );

    return (
      <div
        {...getDataAttributes(dataAttrs)}
        {...otherProps}
        className={classes}
      >
        <div className="ui-tabs__navigation">
          {this.renderTabsNavigation(tabs)}
        </div>
        {Tabs.renderTabsContent(contents)}
      </div>
    );
  }
}

Tabs.defaultProps = {
  open: false,
  selectionType: 'normal',
  name: '',
};

Tabs.propTypes = {
  /**
   * Tab's content.
   */
  children: PropTypes.node.isRequired,

  /**
   * Attribute used to set specific classes which will be combined
   * with the component class + mods.
   */
  className: PropTypes.string,

  /**
   * Data attribute. You can use it to set up GTM key or any custom data-* attribute.
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),

  /**
   * Determine whether tab is active by default
   */
  initValue: PropTypes.string,

  /**
   * Set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),

  /**
   * The callback for onChange tabs event.
   */
  onChange: PropTypes.func,
};

export default Tabs;
