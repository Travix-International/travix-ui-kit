import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  createPortal,
} from 'react-dom';

/**
 * Global component
 * React component for transportation of modals, lightboxes, loading bars... to document.body
 */
class Global extends Component {
  constructor(props) {
    super(props);

    this.isSettedNoScroll = false;
    this.setNoScroll = this.setNoScroll.bind(this);
    this.toggleGlobalNoscroll = this.toggleGlobalNoscroll.bind(this);
    this.target = global.window.document.createElement('div');
    this.target.classList.add('ui-global');
    global.window.document.body.appendChild(this.target);
  }

  toggleGlobalNoscroll(flag) {
    const body = global.window.document.body;
    flag
      ? this.isSettedNoScroll && body.classList.add('ui-global_noscroll')
      : this.isSettedNoScroll && body.classList.remove('ui-global_noscroll');
  }

  setNoScroll() {
    const body = global.window.document.body;
    if (!body.classList.contains('ui-global_noscroll')) {
      this.isSettedNoScroll = true;
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.noscroll) {
      this.setNoScroll();
      this.toggleGlobalNoscroll(true);
    }
  }

  componentWillMount() {
    if (this.props.noscroll) {
      this.setNoScroll();
    }
  }

  componentWillUnmount() {
    this.toggleGlobalNoscroll(false);
    global.window.document.body.removeChild(this.target);
  }

  render() {
    return createPortal((
      <div className={this.props.className}>
        {this.props.children}
      </div>
    ), this.target);
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
