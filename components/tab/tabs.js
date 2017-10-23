import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

/**
 * Tabs component
 */
class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  renderTabs() {
    const { 
      children, 
      onChange,
      value,
      indicator,
    } = this.props;

    let childIndex = 0;

    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return null;
      }

      const childValue = child.props.value || childIndex;
      const selected = childValue === value;

      childIndex += 1;

      return React.cloneElement(child, {
        indicator,
        selected,
        onChange,
        value: childValue,
      });
    });
  }

  render() {
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
        tabs
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
};

export default Tabs;
