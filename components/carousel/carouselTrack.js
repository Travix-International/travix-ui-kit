import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
    this.setupSlidePosition = this.setupSlidePosition.bind(this);

    //
    this.isDragging = false;
  }

  componentDidMount() {
    this.bindEvents();
    this.$elm.style.willChange = 'transform';
    this.setupSlidePosition();
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

    this.$elm.addEventListener('touchstart', this.handleStart);
    document.addEventListener('touchmove', this.handleMove);
    document.addEventListener('touchend', this.handleEnd);

    window.addEventListener('resize', this.setupSlidePosition);
  }

  unbindEvents() {
    this.$elm.removeEventListener('mousedown', this.handleStart);
    document.removeEventListener('mousemove', this.handleMove);
    document.removeEventListener('mouseup', this.handleEnd);

    this.$elm.removeEventListener('touchstart', this.handleStart);
    document.removeEventListener('touchmove', this.handleMove);
    document.removeEventListener('touchend', this.handleEnd);

    window.removeEventListener('resize', this.setupSlidePosition);
  }

  handleStart(evt) {
    evt.preventDefault();
    this.isDragging = true;
    // setup element boundaries
    this.resetSlidePosition(this.props.current);
    // initialize position tracker
    this.startX = evt.pageX;
    if (typeof evt.pageX === 'undefined') {
      this.startX = evt.touches[0].pageX;
    }
    this.currentX = this.startX;
  }

  handleMove(evt) {
    if (!this.isDragging) {
      return;
    }
    this.currentX = evt.pageX;
    if (typeof evt.pageX === 'undefined') {
      this.currentX = evt.touches[0].pageX;
    }
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

  setupSlidePosition() {
    requestAnimationFrame(() => {
      this.$elm.style.transform = `translateX(-${this.props.current * 100}%)`;
    });
  }

  resetSlidePosition(current) {
    this.screenX = 0;
    this.slideBCR = this.$elm.getBoundingClientRect();
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
        className="ui-carousel-track"
        ref={(c) => { this.$elm = c; }}
      >
        {this.props.children}
      </div>
    );
  }
}

CarouselTrack.propTypes = {
  children: PropTypes.node,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  current: PropTypes.number,
};

CarouselTrack.defaultProps = {
  current: 0,
};

export default CarouselTrack;
