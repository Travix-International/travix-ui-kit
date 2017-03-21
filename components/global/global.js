import React, { Component, PropTypes } from 'react';
import {
  unstable_renderSubtreeIntoContainer, // eslint-disable-line
  unmountComponentAtNode,
} from 'react-dom';

/**
 * Global component
 * React component for transportation of modals, lightboxes, loading bars... to document.body
 */
class Global extends Component {
  componentDidMount() {
    if (this.props.noscroll) {
      global.window.document.body.classList.add('ui-global_noscroll');
    }

    this.target = global.window.document.createElement('div');
    this.target.classList.add('ui-global');
    global.window.document.body.appendChild(this.target);
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    unstable_renderSubtreeIntoContainer(this, (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    ), this.target);
  }

  componentWillUnmount() {
    if (this.props.noscroll) {
      global.window.document.body.classList.remove('ui-global_noscroll');
    }
    unmountComponentAtNode(this.target);
    global.window.document.body.removeChild(this.target);
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
  /**
   * Determine whether a body is scrollable or not
   */
  noscroll: PropTypes.bool,
};

export default Global;
