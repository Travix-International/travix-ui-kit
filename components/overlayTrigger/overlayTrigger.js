import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class OverlayTrigger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  toggleElement = () => {
    this.setState({ active: !this.state.active });
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

    const targetElement = triggerAction === 'click'
      ? this.getOnClickTarget()
      : this.getOnHoverTarget();

    const elemToToggle = React.cloneElement(this.props.elemToToggle, {
      active: this.state.active,
    });

    return (
      <div className="ui-overlay-trigger">
        <div className="ui-overlay-trigger__content">
          {targetElement}
          {elemToToggle}
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
  triggerAction: PropTypes.string,
};

OverlayTrigger.defaultProps = {
  children: '',
  triggerAction: 'click',
};
