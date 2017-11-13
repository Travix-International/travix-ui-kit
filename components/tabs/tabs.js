import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import omit from 'lodash.omit';

import Tab from './tab';
import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

/**
 * Tabs component
 */
class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.activeTab,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('activeTab' in nextProps && nextProps.activeTab !== this.props.activeTab) {
      this.setState({
        activeTab: nextProps.activeTab,
      });
    }
  }

  handleTabClick = (value) => {
    this.setState({ activeTab: value });

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
          const { isActive, value } = this.getTabInfo(child, idx);
          contents.push({ isActive, value, data: child.props.children });
        }
      }
    });

    return { tabs, contents };
  }

  getTabInfo(tab, idx) {
    const isTabValueUndefined = tab.props.value === undefined;
    const value = isTabValueUndefined ? idx.toString() : tab.props.value;
    const isActive = this.state.activeTab === '0' && isTabValueUndefined
      ? idx === 0
      : value === this.state.activeTab;

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
        name: `${this.props.name}-${value}`,
        onClick: (event, val) => {
          this.handleTabClick(value);
          if (tab.props.onClick) { tab.props.onClick(event, val); }
        },
      });
    });
  }

  renderTabsContent(contents) {
    if (!contents.length) {
      return null;
    }

    const items = contents.map((content, idx) => {
      const { isActive, data, value } = content;

      const classes = classnames({
        'ui-tabs__content-item': true,
        'ui-tabs__content-item_active': isActive,
      });

      return (
        <div
          aria-hidden={!isActive}
          aria-labelledby={`${this.props.name}-${value}`}
          className={classes}
          id={`${this.props.name}-${value}-panel`}
          key={idx}
          role="tabpanel"
        >
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
    } = this.props;

    const otherProps = omit(this.props, [
      'activeTab',
      'selectionType',
    ]);

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
        <div
          className="ui-tabs__navigation"
          role="tablist"
        >
          {this.renderTabsNavigation(tabs)}
        </div>
        {this.renderTabsContent(contents)}
      </div>
    );
  }
}

Tabs.defaultProps = {
  activeTab: '0',
  open: false,
  selectionType: 'normal',
  name: '',
};

Tabs.propTypes = {
  /**
   * Determine whether tab is active by default
   */
  activeTab: PropTypes.string,

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
   * Set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),

  /**
   * Represents the element's name.
   */
  name: PropTypes.string.isRequired,

  /**
   * The callback for onChange tabs event.
   */
  onChange: PropTypes.func,
};

export default Tabs;
