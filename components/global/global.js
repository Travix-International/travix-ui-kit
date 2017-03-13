import React, { Component, PropTypes } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

/**
 * Global component
 * React component for transportation of modals, lightboxes, loading bars... to document.body
 */
class Global extends Component {
  componentDidMount() {
    if (this.props.noscroll) {
      global.window.document.body.classList.add('ui-global_noscroll');
    }

    this.modalTarget = global.window.document.createElement('div');
    this.modalTarget.classList.add('ui-global');
    global.window.document.body.appendChild(this.modalTarget);
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
    if (this.props.noscroll) {
      global.window.document.body.classList.remove('ui-global_noscroll');
    }
    unmountComponentAtNode(this.modalTarget);
    global.window.document.body.removeChild(this.modalTarget);
  }

  render() { // eslint-disable-line
    return null;
  }
}

Global.defaultProps = {
  noscroll: true,
};

Global.propTypes = {
  /**
   * Specify a CSS class
   */
  className: PropTypes.string,
  /**
   * The modal dialog's body
   */
  children: PropTypes.node,
  noscroll: PropTypes.bool,
};

export default Global;
