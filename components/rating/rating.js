// Imports
import PropTypes from 'prop-types';
import React from 'react';

import { getDataAttributes } from '../_helpers';

/**
 * Rating component
 */
function Rating(props) {
  const { rate, dataAttrs, size } = props;

  const restProps = getDataAttributes(dataAttrs);

  const stars = Array.from(Array(size).keys());
  const value = Math.ceil((rate / size) * 100);

  return (
    <div className="ui-rating" {...restProps}>
      {stars.map(v => <b key={v}>★</b>)}
      <div className="ui-rating-value" style={{ width: `${value}%` }}>
        {stars.map(v => <b key={v}>★</b>)}
      </div>
    </div>
  );
}

Rating.propTypes = {
  /**
   * Rate percentage
   */
  rate: PropTypes.number,
  /**
   * Data attribute. You can use it to set up any custom data-* attribute.
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /**
   * Size of the rating (how many stars)
   */
  size: PropTypes.number,
};

Rating.defaultProps = {
  rate: 0,
  size: 5,
};

export default Rating;
