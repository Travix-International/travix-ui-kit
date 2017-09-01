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
    document.body.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleOutsideClick);
  }

  toggleElement = () => {
    this.setState({ active: !this.state.active });
  }

  showElement() {
    this.setState({ active: true });
  }

  hideElement() {
    this.setState({ active: false });
  }

  handleOutsideClick = (e) => {
    if (this.elem.contains(e.target)) {
      return;
    }

    this.hideElement();
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

  render() {
    const { triggerAction } = this.props;

    const actions = {
      click: this.getOnClickTarget,
      hover: this.getOnHoverTarget,
    };

    const targetElement = actions[triggerAction].call(this);

    const elemToToggle = React.cloneElement(this.props.elemToToggle, {
      active: this.state.active,
    });

    return (
      <div className="ui-overlay-trigger">
        <div className="ui-overlay-trigger__content">
          {targetElement}
          <div className="ui-overlay-trigger__element-to-toogle" ref={this.linkChild}>
            {elemToToggle}
          </div>
        </div>
      </div>
    );
  }
}

OverlayTrigger.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.element,
  ]),
  elemToToggle: PropTypes.element,
  triggerAction: PropTypes.oneOf([
    'click',
    'hover',
  ]),
};

OverlayTrigger.defaultProps = {
  children: '',
  triggerAction: 'click',
};
