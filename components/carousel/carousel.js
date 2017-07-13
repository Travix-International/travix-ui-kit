import React from 'react';
import PropTypes from 'prop-types';
import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

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
      isTransitioning: false,
      previousItem: null,
      currentItem: this.props.current,
    };

    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickGoTo = this.handleClickGoTo.bind(this);
    this.handleSwipeNext = this.handleSwipeNext.bind(this);
    this.handleSwipePrev = this.handleSwipePrev.bind(this);
  }

  componentDidMount() {
    this.swipeHandler = new Swipe(this.carouselTracker);
    this.swipeHandler.onLeft(this.handleSwipeNext);
    this.swipeHandler.onRight(this.handleSwipePrev);
  }

  componentWillUnmount() {
    this.swipeHandler.unbind();
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
    this.setNextItem(index);
  }

  shouldLoad(index) {
    const current = this.state.currentItem;
    return (index >= (current - 1) && index <= (current + 1));
  }

  renderNavigation() {
    return (
      <div>
        <div className="ui-carousel-navigation">
          <button onClick={this.handleClickPrev}>{this.props.prevButton}</button>
          <button onClick={this.handleClickNext}>{this.props.nextButton}</button>
        </div>

        {
          this.props.markers
          ? <CarouselMarkers
            current={this.state.currentItem}
            images={this.props.images}
            onClick={this.handleClickGoTo}
          />
          : <CarouselPage
            current={this.state.currentItem}
            images={this.props.images}
          />
        }
      </div>
    );
  }

  render() {
    const restProps = getDataAttributes(this.props.dataAttrs);

    const trackerStyles = {
      transform: `translateX(-${this.state.currentItem * 100}%)`,
    };

    const carouselMods = this.props.mods ? this.props.mods.slice() : [];
    const carouselClass = getClassNamesWithMods('ui-carousel', carouselMods);

    return (
      <div className={carouselClass} {...restProps}>
        <div className="ui-carousel-track" ref={(c) => { this.carouselTracker = c; }} style={trackerStyles}>
          {this.props.images.map((src, i) => <CarouselItem key={i} load={this.shouldLoad(i)} src={src} />)}
        </div>
        {this.props.images.length > 1 && this.renderNavigation()}
      </div>
    );
  }
}

Carousel.propTypes = {
  /**
   * Data attributes. You can use it to set up any custom data-* attribute
   */
  dataAttrs: PropTypes.object,
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
  prevButton: PropTypes.node,
  /**
   * Content of the navigation button "next"
   */
  nextButton: PropTypes.node,
  /**
   * You can provide set of custom modifications
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  /**
   * Initial index being displayed
   */
  current: PropTypes.number,
};

Carousel.defaultProps = {
  images: [],
  markers: false,
  prevButton: <span>&lsaquo;</span>,
  nextButton: <span>&rsaquo;</span>,
  current: 0,
};
