import React from 'react';
import PropTypes from 'prop-types';

export default function CarouselPage({ images, current }) {
  return (
    <div className="ui-carousel-page">
      {current + 1} / <b>{images.length}</b>
    </div>
  );
}

CarouselPage.propTypes = {
  images: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired,
};
