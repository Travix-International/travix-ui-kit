import React, { Component } from 'react';
import PropTypes from 'prop-types';

const noop = () => {};

class CarouselTrack extends Component {

  constructor(props) {
    super(props);

    // bounding client rect for the container
    this.slideBCR = null;

    // store position for further math
    this.slideX = 0;

    // bind all handlers
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.update = this.update.bind(this);

    //
    this.isDragging = false;
  }

  componentDidMount() {
    this.bindEvents();
    this.$elm.style.willChange = 'transform';
    if (this.props.current > 0) {
      requestAnimationFrame(
        () => {
          this.slideBCR = this.$elm.getBoundingClientRect();
          this.resetSlidePosition(this.props.current);
        }
      );
    }
  }

  componentWillUnmount() {
    this.unbindEvents();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.props.current) {
      this.resetSlidePosition(nextProps.current);
    }
  }

  bindEvents() {
    this.$elm.addEventListener('mousedown', this.handleStart);
    document.addEventListener('mousemove', this.handleMove);
    document.addEventListener('mouseup', this.handleEnd);
  }

  unbindEvents() {
    this.$elm.removeEventListener('mousedown', this.handleStart);
    document.removeEventListener('mousemove', this.handleMove);
    document.removeEventListener('mouseup', this.handleEnd);
  }

  handleStart(evt) {
    evt.preventDefault();
    this.isDragging = true;
    // setup element boundaries
    this.slideBCR = this.$elm.getBoundingClientRect();
    // initialize position tracker
    this.startX = evt.pageX || evt.touches[0].pageX;
    this.currentX = this.startX;
  }

  handleMove(evt) {
    if (!this.isDragging) {
      return;
    }
    this.currentX = typeof evt.pageX !== 'undefined' ? evt.pageX : evt.touches[0].pageX;
    const diff = this.currentX - this.startX;
    this.screenX = diff;
    requestAnimationFrame(this.update);
  }

  handleEnd() {
    if (!this.isDragging) {
      return;
    }
    this.isDragging = false;
    const threshold = this.slideBCR.width * 0.35;
    if (Math.abs(this.screenX) > threshold) {
      (this.screenX > 0) ? this.props.onPrev() : this.props.onNext();
    }
    this.screenX = 0;
    requestAnimationFrame(this.update);
  }

  resetSlidePosition(current) {
    this.screenX = 0;
    this.slideX = (current * this.slideBCR.width) * -1;
    requestAnimationFrame(this.update);
  }

  update() {
    this.elmX = this.screenX + this.slideX;
    this.$elm.style.transform = `translateX(${this.elmX}px)`;
  }

  render() {
    return (
      <div
        className="ui-swipe"
        ref={(c) => { this.$elm = c; }}
      >
        {this.props.children}
      </div>
    );
  }
}

CarouselTrack.propTypes = {
  children: PropTypes.node,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  current: PropTypes.number,
};

CarouselTrack.defaultProps = {
  current: 0,
  onNext: noop,
  onPrev: noop,
};

export default CarouselTrack;
