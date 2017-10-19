import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getClassNamesWithMods } from '../_helpers';

/**
 * ToggleButton component.
 */
class ToggleButton extends Component {
  constructor(props) {
    super(props);

    /**
     * Initialize default state
     */
    this.state = {
      activeItem: props.initialSelectedIndex,
    };
  }

  /**
   * Handlers onClick event
   *
   * @method handleSelectItem
   * @param {Object} event
   * @private
   */
  handleSelectItem = (event) => {
    event.stopPropagation();

    const index = this.props.items.indexOf(event.target.textContent);
    this.setState({ activeItem: index });
    (typeof this.props.handleSelect === 'function') && this.props.handleSelect(index);
  }

  /**
   * Renders items markup
   *
   * @method renderItems
   * @returns {JSX}
   * @private
   */
  renderItems() {
    return this.props.items.map((item, index) => {
      const mods = {
        'active': index === this.state.activeItem,
      };
      const classes = getClassNamesWithMods('ui-toggle-button__item', mods);

      return (
        <li
          className={classes}
          key={index}
          onClick={this.handleSelectItem}
        >
          {item}
        </li>
      );
    });
  }

  render() {
    const {
      className,
      mods = [],
      items,
    } = this.props;

    if (!Array.isArray(items) || items.length < 2) {
      return null;
    }
    const classes = classnames(
      getClassNamesWithMods('ui-toggle-button', mods),
      className,
    );

    return (
      <ul className={classes}>
        {this.renderItems()}
      </ul>
    );
  }
}

ToggleButton.defaultProps = {
  items: [],
  initialSelectedIndex: 0,
};

ToggleButton.propTypes = {
  /**
   * Custom className(s) to be concatenated with the default ones
   * on the component's root element
   */
  className: PropTypes.string,

  /**
   * Specify a function that will be called when a user clicked on  button.
   */
  handleSelect: PropTypes.func.isRequired,

  /**
   * Specifies which item of the provided list is selected when **mounting**. By default is 0.
   */
  initialSelectedIndex: PropTypes.number,

  /**
   * List's elements.
   */
  items: PropTypes.arrayOf(PropTypes.string),

  /**
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
};

export default ToggleButton;
