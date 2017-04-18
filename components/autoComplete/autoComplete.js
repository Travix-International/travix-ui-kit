import React, {
  Component,
  Children,
  cloneElement,
  PropTypes,
} from 'react';

import AutoCompleteItem from './autoCompleteItem';
import Input from '../input/input';
import KEY_CODE from '../constants/keyCode';
import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

const getActiveKey = (keys, key, mode) => {
  if (mode === 'NEXT') {
    return keys[keys.indexOf(key) + 1] || key;
  }

  if (mode === 'PREV') {
    const prevKey = keys[keys.indexOf(key) - 1];
    return prevKey !== undefined ? prevKey : key;
  }

  return keys[0];
};

/**
 * AutoComplete component
 */
class AutoComplete extends Component {
  constructor(props) {
    super(props);

    this.keys = [];
    this.items = [];
    this.initActiveKey = undefined;

    this.state = {
      inputValue: props.defaultValue && props.defaultValue.value,
      open: false,
      activeKey: undefined,
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
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    const code = e.keyCode;

    if ([KEY_CODE.DOWN, KEY_CODE.UP, KEY_CODE.ESC, KEY_CODE.ENTER].indexOf(code) === -1) {
      return;
    }

    switch (code) {
      case KEY_CODE.DOWN:
        this.focusItem(e, 'NEXT');
        break;
      case KEY_CODE.UP:
        this.focusItem(e, 'PREV');
        break;
      case KEY_CODE.ESC:
      case KEY_CODE.ENTER:
        this.applyAktiveKey(e, code);
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
      activeKey: 0,
      inputValue: data.value,
      open: false,
    }, () => {
      this.change(data);
      this.updateInput(data.value);
      this.blurInput();
    });
  }

  change(data) {
    if (this.props.onChange) {
      this.props.onChange(data);
    }
  }

  updateInput(data) {
    if (this.props.onUpdateInput) {
      this.props.onUpdateInput(data);
    }
  }

  handleInputBlur = (e) => {
    if (this.state.open) {
      this.applyAktiveKey(e);
    }

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  handleInputFocus = (e) => {
    this.selectInput();

    const activeKey = this.state.activeKey !== undefined
      ? this.state.activeKey
      : getActiveKey(this.keys);

    if (!this.state.open) {
      this.setState({
        open: true,
        activeKey,
      });
    }

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

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

  focusItem(e, mode) {
    e.preventDefault();

    const activeKey = this.state.activeKey || this.initActiveKey;
    this.setState({
      open: true,
      activeKey: getActiveKey(this.keys, activeKey, mode),
    });
  }

  applyAktiveKey(e, code) {
    e.preventDefault();

    const activeKey = this.state.activeKey || this.initActiveKey;
    const item = this.items[activeKey].getValue();

    if (!item || (!this.state.inputValue && code !== KEY_CODE.ENTER)) {
      this.setState({
        inputValue: undefined,
      }, () => {
        this.updateInput(undefined);
        this.change(undefined);
        this.close();
        this.blurInput();
      });
      return;
    }

    this.setState({
      activeKey: 0,
      inputValue: item.value,
      submitedValue: item.value,
      open: false,
    }, () => {
      this.change(item);
      this.updateInput(item.value);
      this.blurInput();
    });
  }

  close() {
    this.setState({
      open: false,
    });

    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  getValue() {
    const itemData = (this.items.length
      && this.state.activeKey && this.items[this.state.activeKey].getValue())
      || this.props.defaultValue;

    let value = '';
    if (itemData && this.state.inputValue) {
      value = itemData.code !== undefined ? itemData.code : itemData.value;
    }
    return value;
  }

  highlightItem(str) {
    if (!this.state.inputValue) {
      return str;
    }
    const value = this.state.inputValue;
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
          ref: elem => (this.items[index] = elem),
        });
      })
    );
  }

  render() {
    const {
      dataAttrs = {},
      disabled,
      label,
      mods = [],
      name,
      placeholder,
      ...otherProps
    } = this.props;

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
          disabled={disabled}
          id={`ui-autocomplete-input-${name}`}
          onBlur={this.handleInputBlur}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          onKeyDown={this.handleInputKeyDown}
          placeholder={placeholder}
          ref={elem => (this.input = elem)}
          role="combobox"
          value={this.state.inputValue}
        />
        <Input
          hidden
          name={name}
          value={this.getValue()}
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
