import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

/**
 * Tab component
 */
class Tab extends Component {

  render() {
    const {
      dataAttrs = {},
      mods = [],
      ...otherProps
    } = this.props;

    const classes = classnames(
      getClassNamesWithMods('ui-tab-content', mods),
      className
    );

    return (
      <div
        {...getDataAttributes(dataAttrs)}
        {...otherProps}
        className={classes}
      >
        tab-content
      </div>
    );
  }
}

Tab.defaultProps = {
  name: '',
};

Tab.propTypes = {
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

export default Tab;
