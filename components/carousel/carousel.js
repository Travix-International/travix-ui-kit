import PropTypes from 'prop-types';
import React from 'react';
import { getClassNamesWithMods, getDataAttributes, warnAboutDeprecatedProp } from '../_helpers';

import CarouselItem from './carouselItem/carouselItem';
import CarouselMarkers from './carouselMarkers/carouselMarkers';
import CarouselPage from './carouselPage/carouselPage';
import CarouselTrack from './carouselTrack/carouselTrack';

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

  componentWillMount() {
    warnAboutDeprecatedProp(this.props.mods, 'mods', 'className');
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
          <a onClick={this.handleClickPrev}>{this.props.prevButton}</a>
          <a onClick={this.handleClickNext}>{this.props.nextButton}</a>
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
    const { touchable, dataAttrs, images } = this.props;
    const restProps = getDataAttributes(dataAttrs);

    const carouselMods = this.props.mods ? this.props.mods.slice() : [];
    const carouselClass = getClassNamesWithMods('ui-carousel', carouselMods);

    return (
      <div className={carouselClass} {...restProps}>
        <CarouselTrack
          current={this.state.currentItem}
          onNext={this.handleSwipeNext}
          onPrev={this.handleSwipePrev}
          touchable={touchable}
        >
          {images.map((src, i) => <CarouselItem key={i} load={this.shouldLoad(i)} src={src} />)}
        </CarouselTrack>
        {images.length > 1 && this.renderNavigation()}
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
  /**
   * Ability to use touch events for track
   */
  touchable: PropTypes.bool,
};

Carousel.defaultProps = {
  current: 0,
  images: [],
  markers: false,
  nextButton: <span>&rsaquo;</span>,
  prevButton: <span>&lsaquo;</span>,
  touchable: true,
};
