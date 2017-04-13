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

const getItemsKeys = (data) => {
  return data
          .map((item, index) => ({ index, title: item.title }))
          .filter(i => !i.title)
          .map(i => i.index);
};

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

    const keys = getItemsKeys(props.source);

    this.state = {
      inputValue: props.initialValue,
      open: false,
      keys,
      activeKey: getActiveKey(keys),
    };
  }

  componentWillReceiveProps(newProps) {
    const keys = getItemsKeys(newProps.source);
    this.setState({
      activeKey: getActiveKey(keys),
      keys,
    });
  }

  handleInputChange = (e) => {
    e.stopPropagation();
    const value = e.target.value;

    this.props.onInputUpdate(value);
    this.setState({
      inputValue: value,
      open: true,
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
        this.applyAktiveKey(e);
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
      activeKey: index,
      inputValue: item.value,
      open: false,
    }, () => {
      this.props.onChange(item);
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
    if (!this.state.open) {
      this.setState({
        open: true,
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
    this.setState({
      open: true,
      activeKey: getActiveKey(this.state.keys, this.state.activeKey, mode)
    });
  }

  applyAktiveKey(e) {
    e.preventDefault();

    const item = this.props.source && this.props.source[this.state.activeKey];

    if (!item) {
      this.setState({ inputValue: undefined });
      return;
    }

    this.setState({
      inputValue: item.value,
      open: false,
    }, () => {
      this.props.onChange(item);
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
    const key = this.state.activeKey;
    const itemData = this.props.source[key];
    console.log(itemData);
    if (!itemData) {
      return '';
    }
    return itemData.code ? itemData.code : itemData.value;
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
    const { children, source, highlight } = this.props;

    return (
      Children.map(children, (child, index) => {
        if (!child || child.type !== AutoCompleteItem) {
          return null;
        }

        const key = child.props.id || child.key || `ui-autocomplete-item.${index}`;
        const isActive = index === this.state.activeKey;
        let childrenNode = child.props.children;

        if (child.props.children === source[index].value && highlight && !child.props.isTitle) {
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
