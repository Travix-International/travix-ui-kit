import PropTypes from 'prop-types';
import React from 'react';

export default function CarouselMarkers({ images, current, onClick }) {
  return (
    <div className="ui-carousel-markers">
      {
        images.map((src, i) => (
          i === current
            ? <button disabled key={i} />
            : <button data-index={i} key={i} onClick={onClick} />
        ))
      }
    </div>
  );
}

CarouselMarkers.propTypes = {
  images: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
