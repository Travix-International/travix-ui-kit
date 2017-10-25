import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

/**
 * Tab component
 */
class Tab extends Component {
  handleTabClick = (event) => {
    const { value } = this.props;

    if (this.props.onClick) {
      this.props.onClick(event, value);
    }
  };

  render() {
    const {
      active,
      className,
      dataAttrs = {},
      mods = [],
      onClick,
      title,
      value,
      ...otherProps
    } = this.props;

    const classes = classnames(
      getClassNamesWithMods('ui-tab', mods),
      { 'ui-tab_active': active },
      className
    );

    const contentClasses = classnames({
      'ui-tab__content': true,
      'ui-tab__content_active': active,
    });

    return (
      <div
        {...getDataAttributes(dataAttrs)}
        {...otherProps}
        className={classes}
        onClick={this.handleTabClick}
      >
        <div className="ui-tab__shadow-wrapper">
          <div className={contentClasses}>
            {title}
          </div>
        </div>
      </div>
    );
  }
}

Tab.defaultProps = {
  active: false,
  title: '',
};

Tab.propTypes = {
  /**
   * Determine whether a tab is active or not
   */
  active: PropTypes.bool,

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
   * The tabs title.
   */
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * The callback for onClick tab event.
   */
  onClick: PropTypes.func,

  /**
   * Determine value for tab
   */
  value: PropTypes.string,
};

export default Tab;
