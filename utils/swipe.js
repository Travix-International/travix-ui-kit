export default class Swipe {

  constructor(elm) {
    this.handleMove = this.handleMove.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);

    this.$elm = typeof elm === 'string' ? document.querySelector(elm) : elm;
    this.hasTouch = 'ontouchstart' in window;
    this.bindEvents();
  }

  bindEvents() {
    if (this.hasTouch) {
      this.$elm.addEventListener('touchstart', this.handleStart, false);
      this.$elm.addEventListener('touchmove', this.handleMove, false);
      this.$elm.addEventListener('touchend', this.handleEnd, false);
    } else {
      this.$elm.addEventListener('mousedown', this.handleStart, false);
      this.$elm.addEventListener('mousemove', this.handleMove, false);
      this.$elm.addEventListener('mouseup', this.handleEnd, false);
    }
  }

  onLeft(callback) {
    this.onLeft = callback;
    return this;
  }

  onRight(callback) {
    this.onRight = callback;
    return this;
  }

  onUp(callback) {
    this.onUp = callback;
    return this;
  }

  onDown(callback) {
    this.onDown = callback;
    return this;
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
        this.onLeft();
      } else {
        this.onRight();
      }
    } else {
      if (yDiff > 0) { //eslint-disable-line
        this.onUp();
      } else {
        this.onDown();
      }
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;
    this.xUp = null;
    this.yUp = null;
  }

}
