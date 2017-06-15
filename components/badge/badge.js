import React, {
  Component,
  PropTypes,
} from 'react';

import { getClassNamesWithMods } from '../_helpers';

/**
 * Badge component
 */
class Badge extends Component {
  renderBadge() {
    const { arrow, border, children, position, title, ...otherProps } = this.props;

    if (!title) {
      return null;
    }

    const mods = {
      'arrow-left': arrow && position === 'right',
      'arrow-right': arrow && position === 'left',
      'no-border': !border,
    };

    if (position && children) {
      mods[position] = true;
    }

    return (
      <div {...otherProps} className={getClassNamesWithMods('ui-badge-badge', mods)}>
        {title}
        {arrow && (position === 'right' || position === 'left') ? <span className="ui-badge-badge-arrow" /> : null}
      </div>
    );
  }

  render() {
    const { children, mods } = this.props;

    if (!children) {
      return this.renderBadge();
    }

    return (
      <div className={getClassNamesWithMods('ui-badge', mods)}>
        {children}
        {this.renderBadge()}
      </div>
    );
  }
}

Badge.propTypes = {
  /**
   * Does the Badge have an arrow
   */
  arrow: PropTypes.bool,
  /**
   * Does the Badge have a bottom border
   */
  border: PropTypes.bool,
  /**
   * Content, that will be wrapped by Badge
   */
  children: PropTypes.node,
  /**
   * Set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  /**
   * The Badge's position
   */
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /**
   * The Badge's title
   */
  title: PropTypes.string,
};

Badge.defaultProps = {
  arrow: false,
  border: true,
  children: null,
  mods: [],
  title: '',
};

export default Badge;
