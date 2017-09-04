import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class OverlayTrigger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  linkChild = (ref) => {
    this.elem = ref;
  }

  componentDidMount() {
    if (this.props.triggerAction !== 'click') {
      return;
    }

    this.addOutsideClickListener();
  }

  componentWillUnmount() {
    if (this.props.triggerAction !== 'click') {
      return;
    }

    this.removeOutsideClickListener();
  }

  addOutsideClickListener() {
    document.body.addEventListener('click', this.handleOutsideClick);
  }

  removeOutsideClickListener() {
    document.body.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (e) => {
    if (this.elem.contains(e.target)) {
      return;
    }

    this.state.active && this.hideElement();
  }

  toggleElement = () => {
    this.state.active
      ? this.hideElement()
      : this.showElement();
  }

  showElement() {
    const { onElementShow } = this.props;

    this.setState({ active: true });

    onElementShow && onElementShow();
  }

  hideElement() {
    const { onElementHide } = this.props;

    this.setState({ active: false });

    onElementHide && onElementHide();
  }

  getOnClickTarget() {
    const { children } = this.props;

    return (
      <div onClick={this.toggleElement}>
        {children}
      </div>
    );
  }

  getOnHoverTarget() {
    const { children } = this.props;

    return (
      <div onMouseOut={this.toggleElement} onMouseOver={this.toggleElement}>
        {children}
      </div>
    );
  }

  handleCloseButtonClick() {
    this.hideElement();
  }

  render() {
    const { triggerAction } = this.props;

    const actions = {
      click: this.getOnClickTarget,
      hover: this.getOnHoverTarget,
    };

    const targetElement = actions[triggerAction].call(this);

    const elemToToggle = React.cloneElement(this.props.elemToToggle, {
      active: this.state.active,
      onCloseButtonClick: this.handleCloseButtonClick.bind(this), // eslint-disable-line
      triggerAction: this.props.triggerAction,
    });

    return (
      <div className="ui-overlay-trigger">
        <div className="ui-overlay-trigger__content" ref={this.linkChild}>
          {targetElement}
          {elemToToggle}
        </div>
      </div>
    );
  }
}

OverlayTrigger.propTypes = {
  /**
   * The content which triggers the interactive component
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.element,
  ]),
  /**
   * The interactive component to be triggered with a prop (for now: Tooltip)
   */
  elemToToggle: PropTypes.element,
  /**
   * The callback to be called when elementHide action is triggered
   */
  onElementHide: PropTypes.func,
  /**
   * The callback to be called when elementShow action is triggered
   */
  onElementShow: PropTypes.func,
  /**
   * Determines the action on which the interactive component is triggered
   */
  triggerAction: PropTypes.oneOf([
    'click',
    'hover',
  ]),
};

OverlayTrigger.defaultProps = {
  children: '',
  triggerAction: 'click',
};
