import React, { Component, PropTypes } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

class Global extends Component {
  componentDidMount() {
    window.document.body.classList.add('ui-global--noscroll');

    this.modalTarget = window.document.createElement('div');
    this.modalTarget.classList.add('ui-global');
    window.document.body.appendChild(this.modalTarget);
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    render((
      <div className={this.props.className}>
        {this.props.children}
      </div>
    ), this.modalTarget);
  }

  componentWillUnmount() {
    window.document.body.classList.remove('ui-global--noscroll');

    unmountComponentAtNode(this.modalTarget);
    window.document.body.removeChild(this.modalTarget);
  }

  render() {
    return null;
  }
}

Global.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Global;
