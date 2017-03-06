import React, { Component, PropTypes } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

class Global extends Component {
  componentDidMount() {
    this.modalTarget = window.document.createElement('div');
    window.document.body.appendChild(this.modalTarget);
    this.renderModalTarget();
  }

  componentDidUpdate() {
    this.renderModalTarget();
  }

  componentWillUnmount() {
    unmountComponentAtNode(this.modalTarget);
  }

  renderModalTarget() {
    render((
      <div className={this.props.className}>
        {this.props.children}
      </div>
    ), this.modalTarget);
  }

  render() {
    return <noscript/>;
  }
}

Global.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Global;
