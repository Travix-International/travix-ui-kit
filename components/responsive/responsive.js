import PropTypes from 'prop-types';
import React, { Component } from 'react';
import sizes from 'travix-breakpoints/sizes';
import debounce from 'lodash/debounce';
import { isBrowser } from '../_helpers';

const sizesNumbers = Object.keys(sizes).reduce((base, key) => {
  base[key] = {
    min: Number(sizes[key].min.replace('px', '')),
    max: Number(sizes[key].max.replace('px', '')),
  };

  return base;
}, {});

const ignoreFrameSize = {
  min: 0,
  max: 9999,
};

/**
 * Behaviour component for responsive. Renders or doesn't render children depending on the screen size
 */
export default class Responsive extends Component {
  static propTypes = {
    /**
     * Children to show or hide
     */
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node,
    ]).isRequired,

    /**
     * Show if screen size is greater then
     */
    gt: PropTypes.oneOf([
      'tiny',
      'small',
      'medium',
      'large',
      'xlarge',
    ]),

    /**
     * Show if screen size is less then
     */
    lt: PropTypes.oneOf([
      'tiny',
      'small',
      'medium',
      'large',
      'xlarge',
    ]),

    /**
     * Show if screen size is exact
     */
    only: PropTypes.oneOfType([
      PropTypes.oneOf([
        'tiny',
        'small',
        'medium',
        'large',
        'xlarge',
      ]),
      PropTypes.arrayOf(PropTypes.oneOf([
        'tiny',
        'small',
        'medium',
        'large',
        'xlarge',
      ])),
    ]),

    /**
     * **Warning**: If you render a string or multiple elements you need a wrapper element, like `div` or `span`.
     * Keep it until React 16, when we can return fragments
     */
    wrap: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
  };

  static defaultProps = {
    wrap: 'span',
  };

  /**
   * Get initial or updated state for the component
   * @private
   */
  static getState = (props) => {
    const { gt, lt, only } = props;
    let frameSize = null;
    if (only !== undefined && Array.isArray(only)) {
      frameSize = only.map(frame => sizesNumbers[frame]);
    } else {
      frameSize = sizesNumbers[only || gt || lt];
    }

    if (!frameSize) {
      console.warn(`Responsive: Passed unknown frame size name: ${only || gt || lt}. Ignoring any window width`);
      frameSize = ignoreFrameSize;
    }

    if ((gt && lt) || (gt && only) || (lt && only)) {
      console.warn('Responsive: Passed more than one frame size. `only` has a priority');
    }
    const state = {
      width: isBrowser ? global.window.innerWidth : sizesNumbers.tiny.max - 1,
    };

    if (Array.isArray(frameSize)) {
      state.frames = frameSize;
    } else {
      state.min = frameSize.min;
      state.max = frameSize.max;
    }

    return state;
  }

  constructor(props) {
    super(props);
    this.state = Responsive.getState(props);
    this.handleResize = this.handleResize.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Responsive.getState(nextProps));
  }

  componentDidMount() {
    this.bindEvents();
  }

  componentWillUnmount() {
    this.unbindEvents();
  }

  bindEvents = () => {
    global.window.addEventListener('resize', this.handleResize);
  }

  unbindEvents = () => {
    global.window.removeEventListener('resize', this.handleResize);
  }

  isVisible = () => {
    const { width, max, min, frames } = this.state;
    if (max || min) {
      return (width >= min) && (width <= max);
    }

    return frames.find(frame => (width >= frame.min) && (width <= frame.max));
  }

  handleResize = debounce(() => {
    requestAnimationFrame(this.handleUpdate);
  }, 300)

  handleUpdate = () => {
    this.setState({ width: global.window.innerWidth });
  }

  render() {
    const { children, wrap } = this.props;

    if (this.isVisible()) {
      if (typeof children === 'string' || Array.isArray(children)) {
        return React.createElement(wrap, null, children);
      }

      return children;
    }

    return null;
  }
}
