import React from 'react';
import PropTypes from 'prop-types';
import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

import TouchCmp from './swipeTouch';
import MouseCmp from './swipeMouse';

export default class Swipe extends React.Component {

  constructor(props) {
    super(props);

    this.handleMove = this.handleMove.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);

    this.hasTouch = 'ontouchstart' in window;
  }

  handleStart(evt) {
    if (this.hasTouch) {
      this.xDown = evt.touches[0].clientX;
      this.yDown = evt.touches[0].clientY;
    } else {
      this.xDown = evt.clientX;
      this.yDown = evt.clientY;
    }
  }

  handleMove(evt) {
    if (!this.xDown || !this.yDown) {
      return;
    }

    if (this.hasTouch) {
      this.xUp = evt.touches[0].clientX;
      this.yUp = evt.touches[0].clientY;
    } else {
      this.xUp = evt.clientX;
      this.yUp = evt.clientY;
    }
  }

  handleEnd() {
    if (!this.xDown || !this.yDown) {
      return;
    }

    const xDiff = this.xDown - this.xUp;
    const yDiff = this.yDown - this.yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        this.props.onLeft && this.props.onLeft();
      } else {
        this.props.onRight && this.props.onRight();
      }
    } else {
      if (yDiff > 0) { //eslint-disable-line
        this.props.onUp && this.props.onUp();
      } else {
        this.props.onDown && this.props.onDown();
      }
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;
    this.xUp = null;
    this.yUp = null;
  }

  render() {
    const { dataAttrs, mods, children, ...rest } = this.props;
    const dataProps = getDataAttributes(dataAttrs);

    const swipeMods = mods ? mods.slice() : [];
    const swipeClass = getClassNamesWithMods('ui-swipe', swipeMods);

    const Wrapper = this.hasTouch ? TouchCmp : MouseCmp;

    return (
      <Wrapper
        className={swipeClass}
        onEnd={this.handleEnd}
        onMove={this.handleMove}
        onStart={this.handleStart}
        {...dataProps}
        {...rest}
      >
        {children}
      </Wrapper>
    );
  }

}

Swipe.propTypes = {
  /**
   * Data attributes. You can use it to set up any custom data-* attribute
   */
  dataAttrs: PropTypes.object,
  /**
   * You can provide set of custom modifications
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  /**
   * Content to be wrapped
   */
  children: PropTypes.node,
  /**
   * Gesture callback
   */
  onLeft: PropTypes.func,
  /**
   * Gesture callback
   */
  onRight: PropTypes.func,
  /**
   * Gesture callback
   */
  onUp: PropTypes.func,
  /**
   * Gesture callback
   */
  onDown: PropTypes.func,
};
