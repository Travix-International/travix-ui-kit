import React, { Component } from 'react';

import Dropdown from './dropDown/dropDown';

class Themes extends Component {
  state = {
    value: 'default',
  };

  onChange = (option) => {
    this.setState({ value: option.value });

    if (this.themeCSS) {
      this.themeCSS.parentNode.removeChild(this.themeCSS);
    }

    this.themeCSS = document.createElement('link');
    this.themeCSS.href = `/${option.value}.css`;
    this.themeCSS.rel = 'stylesheet';
    document.head.appendChild(this.themeCSS);

    this.applyCssPolyfill(option);
  }

  applyCssPolyfill(option) {
    if (window.CSS && CSS.supports('color', 'var(--primary)') && navigator.userAgent.indexOf('Edge/15') === -1) {
      return;
    }

    if (this.polyfillJS) {
      this.polyfillJS.parentNode.removeChild(this.polyfillJS);
      this.themeJS.parentNode.removeChild(this.themeJS);
    }

    this.themeJS = document.createElement('script');
    this.themeJS.src = `/${option.value}.js`;
    this.themeJS.async = false;
    document.head.appendChild(this.themeJS);

    this.polyfilljs = document.createElement('script');
    this.polyfilljs.src = '/css-vars-polyfill.js';
    this.polyfilljs.async = false;
    document.head.appendChild(this.polyfilljs);
  }

  componentWillMount() {
    this.onChange(this.state);
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
