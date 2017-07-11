import React from 'react';
import PropTypes from 'prop-types';
import CarouselItem from './carouselItem';
import CarouselMarkers from './carouselMarkers';
import CarouselPage from './carouselPage';
import Swipe from '../../utils/swipe';

/**
 * Carousel component
 */
export default class Carousel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      images: props.images,
      isTransitioning: false,
      previousItem: null,
      currentItem: 0,
    };

    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickGoTo = this.handleClickGoTo.bind(this);
    this.handleSwipeNext = this.handleSwipeNext.bind(this);
    this.handleSwipePrev = this.handleSwipePrev.bind(this);
  }

  componentDidMount() {
    const swipeHandler = new Swipe(this.carouselTracker);
    swipeHandler.onLeft(this.handleSwipeNext);
    swipeHandler.onRight(this.handleSwipePrev);
  }

  setNextItem(next) {
    this.setState(state => ({
      isTransitioning: true,
      currentItem: next,
      previousItem: state.currentItem,
    }));
  }

  handleClickPrev(e) {
    e.preventDefault();

    let next = this.state.currentItem - 1;
    if (next < 0) {
      next = this.props.images.length - 1;
    }

    this.setNextItem(next);
  }

  handleClickNext(e) {
    e.preventDefault();

    let next = this.state.currentItem + 1;
    if (next === this.props.images.length) {
      next = 0;
    }

    this.setNextItem(next);
  }

  handleSwipePrev() {
    let next = this.state.currentItem - 1;
    if (next < 0) {
      return;
    }

    this.setNextItem(next);
  }

  handleSwipeNext() {
    let next = this.state.currentItem + 1;
    if (next === this.props.images.length) {
      return;
    }

    this.setNextItem(next);
  }

  handleClickGoTo(e) {
    e.preventDefault();
    const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
    if (index === this.state.currentItem) {
      return;
    }

    this.setNextItem(index);
  }

  shouldLoad(index) {
    const current = this.state.currentItem;
    return (index >= (current - 1) && index <= (current + 1));
  }

  renderNavigation() {
    return (
      <div>
        <div className="carousel-navigation">
          <button onClick={this.handleClickPrev}>{this.props.prevButton}</button>
          <button onClick={this.handleClickNext}>{this.props.nextButton}</button>
        </div>

        {
          this.props.markers
          ? <CarouselMarkers
            current={this.state.currentItem}
            images={this.state.images}
            onClick={this.handleClickGoTo}
          />
          : <CarouselPage
            current={this.state.currentItem}
            images={this.state.images}
          />
        }
      </div>
    );
  }

  render() {
    const trackerStyles = {
      transform: `translateX(-${this.state.currentItem * 100}%)`,
    };

    return (
      <div className="carousel">
        <div className="carousel-track" ref={(c) => { this.carouselTracker = c; }} style={trackerStyles}>
          {this.state.images.map((src, i) => <CarouselItem key={i} load={this.shouldLoad(i)} src={src} />)}
        </div>
        {this.state.images.length > 1 && this.renderNavigation()}
      </div>
    );
  }
}

Carousel.propTypes = {
  /**
   * Images array
   */
  images: PropTypes.arrayOf(PropTypes.string),
  /**
   * Display pagination as markers
   */
  markers: PropTypes.bool,
  /**
   * Content of the navigation button "previous"
   */
  prevButton: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /**
   * Content of the navigation button "next"
   */
  nextButton: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Carousel.defaultProps = {
  images: [],
  markers: false,
  prevButton: <span>&lsaquo;</span>,
  nextButton: <span>&rsaquo;</span>,
};
