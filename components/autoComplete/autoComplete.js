import React, {
  Component,
  Children,
  cloneElement,
  PropTypes,
} from 'react';
import keycode from 'keycode';

import Input from '../input/input';
import AutoCompleteItem from './autoCompleteItem';
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

    this.source = [];
    this.keys = [];
    this.initActiveKey = undefined;

    this.state = {
      inputValue: props.initialValue,
      open: false,
      activeKey: undefined,
    };
  }

  handleInputChange = (e) => {
    e.stopPropagation();
    const value = e.target.value;

    this.props.onInputUpdate(value);
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

    const code = keycode(e);

    if (['down', 'up', 'esc', 'enter'].indexOf(code) === -1) {
      return;
    }

    switch (code) {
      case 'down':
        this.focusItem(e, 'NEXT');
        break;
      case 'up':
        this.focusItem(e, 'PREV');
        break;
      case 'esc':
      case 'enter':
        this.applyAktiveKey(e, code);
        break;
      default:
        break;
    }
  };

  handleItemMouseDown = (e) => {
    e.preventDefault();
  };

  handleItemClick = (e, item, index) => {
    e.stopPropagation();

    this.setState({
      activeKey: 0,
      inputValue: item.value,
      open: false,
    }, () => {
      this.props.onChange(item);
      this.props.onInputUpdate(item.value);
      this.blurInput();
    });
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
    const item = this.source[activeKey];

    // if (item.value === this.state.submitedValue) {
    //   this.close();
    //   this.blurInput();
    //   return;
    // }

    if (!item || (!this.state.inputValue && code !== 'enter')) {
      this.setState({
        inputValue: undefined,
      }, () => {
        this.props.onInputUpdate(undefined);
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
      this.props.onChange(item);
      this.props.onInputUpdate(item.value);
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
    const itemData = this.source[this.state.activeKey];
    return itemData && this.state.inputValue ? itemData.value : '';
  }

  highlightItem(str) {
    if (!this.state.inputValue) return str;
    const value = this.state.inputValue;
    const descriptionRule = new RegExp(`(${value})`, 'i');
    const highlighted = str.replace(descriptionRule, '<span class="ui-autocomplete-item_highlight">$1</span>')
    return (
      <div dangerouslySetInnerHTML={{ __html: highlighted }}/>
    );
  }

  renderItems() {
    const { children, highlight } = this.props;
    this.source = [];
    this.keys = [];
    this.initActiveKey = undefined;

    return (
      Children.map(children, (child, index) => {
        if (!child || child.type !== AutoCompleteItem) {
          return null;
        }

        /* Init items source list and keys data */
        this.source.push(child.props.source);
        !child.props.isTitle && this.keys.push(index);
        if (!child.props.isTitle && this.initActiveKey === undefined) {
          this.initActiveKey = index;
        }

        const key = child.props.id || child.key || `ui-autocomplete-item.${index}`;
        const isActive = index === (this.state.activeKey || this.initActiveKey);
        let childrenNode = child.props.children;

        if (highlight && !child.props.isTitle) {
          childrenNode = this.highlightItem(child.props.children);
        }

        return cloneElement(child, {
          id: key,
          index,
          isActive,
          onClick: this.handleItemClick,
          onMouseDown: this.handleItemMouseDown,
          children: childrenNode,
        });
      })
    );
  }

  render() {
    const {
      dataAttrs = {},
      disabled,
      mods = [],
      name,
      ...otherProps
    } = this.props;

    this.state.open && mods.push('open');
    const className = getClassNamesWithMods('ui-autocomplete', mods);

    return (
      <div
        {...getDataAttributes(dataAttrs)}
        {...otherProps}
        className={className}
      >
        <Input
          disabled={disabled}
          onBlur={this.handleInputBlur}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          onKeyDown={this.handleInputKeyDown}
          ref={elem => (this.input = elem)}
          value={this.state.inputValue}
        />
        <Input
          hidden
          name={name}
          value={this.getValue()}
        />
        <div className="ui-autocomplete__popunder">
          <ul className="ui-autocomplete__popunder-list">
            {this.renderItems()}
          </ul>
        </div>
      </div>
    );
  }
}

export default AutoComplete;
