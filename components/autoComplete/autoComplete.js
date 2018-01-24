import PropTypes from 'prop-types';
import React, {
  Component,
  Children,
  cloneElement,
} from 'react';

import AutoCompleteItem from './autoCompleteItem';
import Input from '../input/input';
import KEY_CODE from '../constants/keyCode';
import { getClassNamesWithMods, getDataAttributes, ejectOtherProps } from '../_helpers';

function getNextKey(keys, key) {
  return keys[keys.indexOf(key) + 1] || key;
}

function getPrevKey(keys, key) {
  const prevKey = keys[keys.indexOf(key) - 1];
  return prevKey !== undefined ? prevKey : key;
}

/**
 * AutoComplete component
 */
class AutoComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: undefined,
      inputValue: props.defaultValue && props.defaultValue.value,
      open: false,
      selectedValue: undefined,
      selectedKey: undefined,
    };
  }

  handleInputChange = (e) => {
    e.stopPropagation();
    const value = e.target.value;
    this.updateInput(value);

    this.setState({
      inputValue: value,
      open: true,
      activeKey: undefined,
    });
  }

  handleInputKeyDown = (e) => {
    const code = e.keyCode;

    if (typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(e);
    }

    const activeKey = this.state.activeKey || this.initActiveKey;

    switch (code) {
      case KEY_CODE.DOWN:
        this.focusItem(e, getNextKey(this.keys, activeKey));
        break;
      case KEY_CODE.UP:
        this.focusItem(e, getPrevKey(this.keys, activeKey));
        break;
      case KEY_CODE.ESC:
      case KEY_CODE.ENTER:
        this.applyActiveKey(e);
        break;
      default:
        break;
    }
  };

  handleItemMouseDown = (e) => {
    e.preventDefault();
  };

  handleItemClick = (e, data) => {
    e.stopPropagation();

    this.setState({
      activeKey: undefined,
      inputValue: data.value,
      open: false,
      selectedValue: data.code || data.value,
      selectedKey: data.key,
    }, () => {
      this.change(data);
      this.blurInput();
    });
  }

  handleInputBlur = (e) => {
    if (this.state.open) {
      this.applyActiveKey(e);
    }

    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(e);
    }
  }

  handleInputFocus = (e) => {
    this.selectInput();

    const activeKey = this.state.activeKey !== undefined
      ? this.state.activeKey
      : this.keys[0];

    if (!this.state.open) {
      this.setState({
        open: true,
        activeKey,
      });
    }

    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(e);
    }
  };

  initInputRef = (elem) => {
    this.input = elem;
  }

  initItemRef = (index) => {
    return (elem) => {
      this.items[index] = elem;
    };
  }

  change(data) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(data);
    }
  }

  updateInput(data) {
    if (typeof this.props.onUpdateInput === 'function') {
      this.props.onUpdateInput(data);
    }
  }

  blurInput() {
    if (this.input) {
      this.input.blur();
    }
  }

  focusInput() {
    if (this.input) {
      this.input.focus();
    }
  }

  selectInput() {
    if (this.input) {
      this.input.select();
    }
  }

  focusItem(e, activeKey) {
    e.preventDefault();

    this.setState({
      open: true,
      activeKey,
    });
  }

  applyActiveKey(e) {
    e.preventDefault();

    const activeKey = this.state.activeKey !== undefined
      ? this.state.activeKey
      : this.initActiveKey;

    const item = this.items.length
      && this.items[activeKey] && this.items[activeKey].getValue();
    const value = this.state.inputValue;

    const isPreviousValue = item && (this.state.selectedKey === item.key
      && (this.state.selectedValue === item.code || this.state.selectedValue === item.value));

    if (!item || (!value && e.keyCode !== KEY_CODE.ENTER)) {
      if (!this.state.selectedValue && !value) {
        this.close();
        return;
      }

      this.setState({
        activeKey: undefined,
        inputValue: value,
        selectedValue: undefined,
        selectedKey: undefined,
        open: false,
      }, () => {
        this.updateInput(value);
        this.change(undefined);
        this.blurInput();
      });
      return;
    }

    if (!isPreviousValue) {
      this.setState({
        activeKey: undefined,
        inputValue: item.value,
        open: false,
        selectedValue: item.code || item.value,
        selectedKey: item.key,
      }, () => {
        this.change(item);
        this.blurInput();
      });
      return;
    }

    this.close();
  }

  close() {
    this.setState({
      open: false,
    });

    if (typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  }

  highlightItem(str) {
    if (!this.state.inputValue) {
      return str;
    }
    // escape special characters
    const value = this.state.inputValue.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const descriptionRule = this.props.highlightRule || new RegExp(`(${value})`, 'i');
    const highlighted = str.replace(descriptionRule, '<span class="ui-autocomplete-item_highlight">$1</span>');

    return (
      <div dangerouslySetInnerHTML={{ __html: highlighted }}/>
    );
  }

  renderItems() {
    const { children, highlighted, name } = this.props;
    this.items = [];
    this.keys = [];
    this.initActiveKey = undefined;

    return (
      Children.map(children, (child, index) => {
        if (!child || child.type !== AutoCompleteItem) {
          return null;
        }

        /* Init keys */
        !child.props.isTitle && this.keys.push(index);
        if (!child.props.isTitle && this.initActiveKey === undefined) {
          this.initActiveKey = index;
        }

        const id = child.props.id || `ui-autocomplete-item-${name}-${index}`;
        const isActive = index === (this.state.activeKey || this.initActiveKey);
        let childrenNode = child.props.children;

        if (highlighted && typeof child.props.children === 'string' && !child.props.isTitle) {
          childrenNode = this.highlightItem(child.props.children);
        }

        return cloneElement(child, {
          children: childrenNode,
          id,
          index,
          isActive,
          onClick: this.handleItemClick,
          onMouseDown: this.handleItemMouseDown,
          ref: this.initItemRef(index),
        });
      })
    );
  }

  render() {
    const {
      dataAttrs = {},
      disabled,
      label,
      name,
      placeholder,
    } = this.props;
    const mods = this.props.mods ? this.props.mods.slice() : [];

    const otherProps = ejectOtherProps(this.props, AutoComplete.propTypes);

    this.state.open && mods.push('open');
    const className = getClassNamesWithMods('ui-autocomplete', mods);
    const activeKey = this.state.activeKey || 0;

    const labelBlock = label ? (
      <label htmlFor={`ui-autocomplete-input-${name}`} id={`ui-autocomplete-label-${name}`}>{label}</label>
    ) : '';

    return (
      <div
        {...getDataAttributes(dataAttrs)}
        {...otherProps}
        className={className}
      >
        {labelBlock}
        <Input
          aria-activedescendant={`ui-autocomplete-item-${name}-${activeKey}`}
          aria-autocomplete="list"
          aria-expanded={this.state.open}
          aria-haspopup={this.state.open}
          aria-labelledby={label ? `ui-autocomplete-label-${name}` : ''}
          aria-owns={`ui-autocomplete-list-${name}`}
          autoComplete="off"
          disabled={disabled}
          id={`ui-autocomplete-input-${name}`}
          onBlur={this.handleInputBlur}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          onKeyDown={this.handleInputKeyDown}
          placeholder={placeholder}
          ref={this.initInputRef}
          role="combobox"
          value={this.state.inputValue}
        />
        <Input
          hidden
          name={name}
          value={this.state.selectedValue}
        />
        <div className="ui-autocomplete__popunder">
          <ul
            aria-expanded={this.state.open}
            className="ui-autocomplete__popunder-list"
            id={`ui-autocomplete-list-${name}`}
            role="listbox"
          >
            {this.renderItems()}
          </ul>
        </div>
      </div>
    );
  }
}

AutoComplete.defaultProps = {
  disabled: false,
  highlighted: false,
};

AutoComplete.propTypes = {
  /**
   * The AutoComplete should contains AutoCompleteItem components.
   */
  children: PropTypes.node.isRequired,
  /**
   * Data attribute. You can use it to set up GTM key or any custom data-* attribute.
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /**
   * Disable autocomplete.
   */
  disabled: PropTypes.bool,
  /**
   * Default selected option.
   */
  defaultValue: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    code: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  /**
   * Highlighting of found items.
   */
  highlighted: PropTypes.bool,
  /**
   * Rule for highlighting of found items.
   */
  highlightRule: PropTypes.object,
  /**
   * Label for autocomplete.
   */
  label: PropTypes.string,
  /**
   * Set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  /**
   * Represents the element's name.
   */
  name: PropTypes.string.isRequired,
  /**
   * Function to be triggered when the autocomplete item is blurred.
   */
  onBlur: PropTypes.func,
  /**
   * Function to be triggered when the autocomplete item is selected.
   */
  onChange: PropTypes.func,
  /**
   * Function to be triggered when the autocomplete is closed.
   */
  onClose: PropTypes.func,
  /**
   * Function to be triggered when the autocomplete input is focued.
   */
  onFocus: PropTypes.func,
  /**
   * Function to be triggered when the autocomplete input is updated.
   */
  onUpdateInput: PropTypes.func,
  /**
   * Function to be triggered when key is pressed.
   */
  onKeyDown: PropTypes.func,
  /**
   * Placeholder for input element .
   */
  placeholder: PropTypes.string,
};

export default AutoComplete;
