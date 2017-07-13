import React from 'react';
import PropTypes from 'prop-types';

const Touch = ({ children, onEnd, onMove, onStart, ...rest }) => (
  <div onTouchEnd={onEnd} onTouchMove={onMove} onTouchStart={onStart} {...rest}>
    {children}
  </div>
);

Touch.propTypes = {
  children: PropTypes.node,
  onEnd: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
};

export default Touch;
