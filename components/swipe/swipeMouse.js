import React from 'react';
import PropTypes from 'prop-types';

const Touch = ({ children, onEnd, onMove, onStart, ...rest }) => (
  <div onMouseDown={onStart} onMouseMove={onMove} onMouseUp={onEnd} {...rest}>
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
