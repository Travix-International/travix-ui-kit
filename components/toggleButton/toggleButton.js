import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getClassNamesWithMods } from '../_helpers';

/**
 * ToggleButton component.
 */
class ToggleButton extends Component {
  /**
   * Instantiates ToggleButton component
   *
   * @constructor
   * @param {Object} props Component properties object
   * @return {Object} ToggleButton instance
   */
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);

    const mods = props.mods ? props.mods.slice() : [];

    this.state = {
      activeItem: 0,
      mods,
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
    if (typeof this.props.handleSelect === 'function') {
      this.props.handleSelect(index);
    }
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
      const classes = ['ui-toggle-button__item'];
      if (index === this.state.activeItem) {
        classes.push('ui-toggle-button__item--active');
      }
      const classNameItem = classes.join(' ');
      return (
        <li
          className={classNameItem}
          key={index}
          onClick={this.handleSelectItem}
        >
          {item}
        </li>
      );
    });
  }

  render() {
    if (!(Array.isArray(this.props.items) && this.props.items.length > 1)) {
      return null;
    }

    const className = getClassNamesWithMods('ui-toggle-button', this.state.mods);

    return (
      <ul className={className}>
        {this.renderItems()}
      </ul>
    );
  }
}

ToggleButton.defaultProps = {
  items: [],
};

ToggleButton.propTypes = {
  /**
   * List's elements.
   */
  items: PropTypes.arrayOf(PropTypes.string),

  /**
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),

  /**
   * Specify a function that will be called when a user clicked on  button.
   */
  handleSelect: PropTypes.func.isRequired,
};

export default ToggleButton;
