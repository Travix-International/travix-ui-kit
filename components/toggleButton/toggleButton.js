import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getClassNamesWithMods } from '../_helpers';

/**
 * ToggleButton component.
 */
class ToggleButton extends Component {
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);

    const mods = props.mods ? props.mods.slice() : [];
    mods.push(`size_${props.size}`);

    this.state = {
      activeItem: 0,
      mods,
    };
  }

  handleSelectItem(event) {
    event.stopPropagation();
    const index = this.props.items.indexOf(event.target.textContent);

    this.setState(
      { activeItem: index },
      () => {
        if (typeof this.props.handleSelect === 'function') {
          this.props.handleSelect(index);
        }
      });
  }

  renderItems() {
    return this.props.items.map((item, index) => {
      const classNameItem = `ui-toggle-button__item ${index === this.state.activeItem ? 'active' : ''}`;
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
  size: 'm',
};

ToggleButton.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  mods: PropTypes.arrayOf(PropTypes.string),
  handleSelect: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
};

export default ToggleButton;
