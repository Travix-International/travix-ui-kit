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
      inputValue: props.initialValue && props.initialValue.value,
      open: false,
      activeKey: undefined,
    };
  }

  handleInputChange = (e) => {
    e.stopPropagation();
    const value = e.target.value;
    this.inputUpdate(value);

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
      this.inputUpdate(data.value);
      this.blurInput();
    });
  }

  change(data) {
    if (this.props.onChange) {
      this.props.onChange(data);
    }
  }

  inputUpdate(data) {
    if (this.props.onInputUpdate) {
      this.props.onInputUpdate(data);
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
        this.inputUpdate(undefined);
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
      this.inputUpdate(item.value);
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
      || this.props.initialValue;

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
    const descriptionRule = new RegExp(`(${value})`, 'i');
    const highlighted = str.replace(descriptionRule, '<span class="ui-autocomplete-item_highlight">$1</span>');
    return (
      <div dangerouslySetInnerHTML={{ __html: highlighted }}/>
    );
  }

  renderItems() {
    const { children, highlight } = this.props;
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

        const key = child.props.id || child.key || `ui-autocomplete-item.${index}`;
        const isActive = index === (this.state.activeKey || this.initActiveKey);
        let childrenNode = child.props.children;

        if (highlight && !child.props.isTitle) {
          childrenNode = this.highlightItem(child.props.children);
        }

        return cloneElement(child, {
          children: childrenNode,
          id: key,
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
      mods = [],
      name,
      placeholder,
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
          placeholder={placeholder}
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

AutoComplete.propTypes = {
  children: PropTypes.node,
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  disabled: PropTypes.bool,
  initialValue: PropTypes.shape({
    value: PropTypes.any,
    code: PropTypes.any,
  }),
  highlight: PropTypes.bool,
  /**
   * Set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onFocus: PropTypes.func,
  onInputUpdate: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
};

export default AutoComplete;
