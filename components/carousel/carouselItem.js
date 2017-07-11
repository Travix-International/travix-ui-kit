import React from 'react';
import PropTypes from 'prop-types';

export default class CarouselItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null,
      hasLoaded: false,
    };
  }

  componentDidMount() {
    this.setupImage(this.props.load, this.props.src);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load && !this.state.hasLoaded) {
      this.setupImage(nextProps.load, nextProps.src);
    }
  }

  setupImage(load, src) {
    if (!load || !src) {
      return;
    }
    this.setState(() => ({ hasLoaded: true, imageSrc: src }));
  }

  render() {
    const { imageSrc, hasLoaded } = this.state;
    const imageStyles = {};

    if (imageSrc && hasLoaded) {
      imageStyles.backgroundImage = `url('${imageSrc}')`;
    }

    return (
      <div className="carousel-item">
        <div className="carousel-item-image" style={imageStyles}>&nbsp;</div>
      </div>
    );
  }
}

CarouselItem.propTypes = {
  load: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
};
