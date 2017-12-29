import React, { Component } from 'react';

import Dropdown from './dropDown/dropDown';

const CURRENT_THEME_KEY = 'current_theme';

class Themes extends Component {
  state = {
    value: sessionStorage.getItem(CURRENT_THEME_KEY) || 'default',
  };

  onChange = ({ label }) => {
    this.setState({ value: label });
    sessionStorage.setItem(CURRENT_THEME_KEY, label);
  }

  applyThemeCss() {
    if (this.themeCSS) {
      this.themeCSS.parentNode.removeChild(this.themeCSS);
    }

    this.themeCSS = document.createElement('link');
    this.themeCSS.href = `/${this.state.value}.css`;
    this.themeCSS.rel = 'stylesheet';
    document.head.appendChild(this.themeCSS);
  }

  applyCssPolyfill() {
    if (window.CSS && CSS.supports('color', 'var(--primary)') && navigator.userAgent.indexOf('Edge/15') === -1) {
      return;
    }

    if (this.polyfillJS) {
      this.polyfillJS.parentNode.removeChild(this.polyfillJS);
      this.themeJS.parentNode.removeChild(this.themeJS);
    }

    this.themeJS = document.createElement('script');
    this.themeJS.src = `/${this.state.value}.js`;
    this.themeJS.async = false;
    document.head.appendChild(this.themeJS);

    this.polyfilljs = document.createElement('script');
    this.polyfilljs.src = '/css-vars-polyfill.js';
    this.polyfilljs.async = false;
    document.head.appendChild(this.polyfilljs);
  }

  componentWillMount() {
    this.applyThemeCss();
    this.applyCssPolyfill();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.componentWillMount();
    }
  }

  render() {
    return (
      <div>
        <Dropdown
          onChange={this.onChange}
          options={[
            { value: 'default', label: 'default' },
            ...THEME_VARIANTS,
          ]}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default Themes;
