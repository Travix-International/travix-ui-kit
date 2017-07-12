import React from 'react';
import PropTypes from 'prop-types';

export default function CarouselMarkers({ images, current, onClick }) {
  return (
    <div className="ui-carousel-markers">
      {images.map((src, i) => (i === current ? <span key={i} /> : <button data-index={i} key={i} onClick={onClick} />))}
    </div>
  );
}

CarouselMarkers.propTypes = {
  images: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
