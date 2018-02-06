import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getClassNamesWithMods, getDataAttributes, warnAboutDeprecatedProp } from '../_helpers';

/**
 * Tab component
 */
class Tab extends Component {
  componentWillMount() {
    warnAboutDeprecatedProp(this.props.mods, 'mods', 'className');
  }

  handleTabClick = (event) => {
    const { value, onClick } = this.props;

    if (onClick) {
      onClick(event, value);
    }
  };

  renderTabContent() {
    const {
      active,
      title,
    } = this.props;

    const contentClasses = classnames({
      'ui-tab__content': true,
      'ui-tab__content_active': active,
      'ui-tab__content-paddings': typeof title === 'string',
    });

    return (
      <div className={contentClasses}>
        {title}
      </div>
    );
  }

  render() {
    const {
      active,
      className,
      dataAttrs = {},
      mods = [],
      name,
      title,
    } = this.props;

    const classes = classnames(
      getClassNamesWithMods('ui-tab', mods),
      { 'ui-tab_active': active },
      className
    );

    return (
      <div
        {...getDataAttributes(dataAttrs)}
        aria-controls={`${name}-panel`}
        aria-selected={active}
        className={classes}
        id={name}
        onClick={this.handleTabClick}
        role="tab"
        tabIndex="0"
        title={typeof title === 'string' ? title : ''}
      >
        <div className="ui-tab__shadow-wrapper">
          {this.renderTabContent()}
        </div>
      </div>
    );
  }
}

Tab.defaultProps = {
  active: false,
  name: '',
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
   * Represents the element's name.
   */
  name: PropTypes.string.isRequired,

  /**
   * The callback for onClick tab event.
   */
  onClick: PropTypes.func,

  /**
   * The tab title.
   */
  title: PropTypes.node.isRequired,

  /**
   * Determine value for tab
   */
  value: PropTypes.string,
};

export default Tab;
