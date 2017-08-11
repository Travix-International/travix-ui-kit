import PropTypes from 'prop-types';
import React from 'react';

export default function CarouselPage({ images, current }) {
  return (
    <div className="ui-carousel-page">
      {current + 1} / {images.length}
    </div>
  );
}

CarouselPage.propTypes = {
  images: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired,
};
