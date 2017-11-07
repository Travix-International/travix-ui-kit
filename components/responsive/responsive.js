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
    only: PropTypes.oneOf([
      'tiny',
      'small',
      'medium',
      'large',
      'xlarge',
    ]),

    /**
     * If you render a string you need a wrapper element, like `div` or `span`
     */
    wrap: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]),
  };

  static defaultProps = {
    wrap: 'span',
  };

  static getState = (props) => {
    const { gt, lt, only } = props;
    let frameSize = sizesNumbers[only || gt || lt];

    if (!frameSize) {
      console.warn(`Responsive: Passed unknown frame size name: ${only || gt || lt}. Ignoring any window width`);
      frameSize = ignoreFrameSize;
    }

    if ((gt && lt) || (gt && only) || (lt && only)) {
      console.warn('Responsive: Passed more than one frame size. `only` has a priority');
    }

    return {
      width: isBrowser ? window.innerWidth : sizesNumbers.tiny.max - 1,
      min: frameSize.min,
      max: frameSize.max,
    };
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
    window.addEventListener('resize', this.handleUpdate);
  }

  unbindEvents = () => {
    window.removeEventListener('resize', this.handleUpdate);
  }

  isVisible = () => {
    const { width, max, min } = this.state;

    return (width >= min) && (width <= max);
  }

  handleResize = debounce(() => {
    requestAnimationFrame(this.handleUpdate);
  }, 300)

  handleUpdate = () => {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { children, wrap } = this.props;

    if (this.isVisible()) {
      if (typeof children === 'string') {
        return React.createElement(wrap, null, children);
      }

      return children;
    }

    return null;
  }
}
