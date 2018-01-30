import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { getClassNamesWithMods, warnAboutDeprecatedProp } from '../_helpers';

/**
 * General Spinner component.
 */
function Spinner(props) {
  warnAboutDeprecatedProp(props.mods, 'mods', 'className');

  const { className, size } = props;
  const mods = props.mods ? props.mods.slice() : [];

  mods.push(`size_${size}`);

  const classes = classnames(getClassNamesWithMods('ui-spinner', mods), className);

  /* eslint-disable max-len */
  return (
    <div className={classes}>
      <svg
        version="1.1"
        viewBox="0 0 80 80"
        x="0px"
        xlinkHref="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        y="0px"
      >
        <g>
          <g>
            <circle
              clipRule="evenodd"
              cx="40"
              cy="40"
              fillRule="evenodd"
              r="34.3"
            />
            <path
              className="ui-spinner_darker"
              clipRule="evenodd"
              d="M39.9,33.1c0.5-5.4-1.5-10.4-5.2-14.9c6.1-2.1,7.6-1.5,8.6,3.8c0.5,2.9,0.4,6,0.1,9c-0.1,0.9-0.3,1.8-0.7,2.7c-0.8-0.3-1.8-0.6-2.7-0.6H39.9z"
              fillRule="evenodd"
            />
            <path
              className="ui-spinner_dark"
              clipRule="evenodd"
              d="M46.6,41.9c5.3,2,10.6,2.1,16-0.3c0.8,5.6-0.3,7-5.4,6.9c-4.6,0-8.5-1.6-12-4.1C45.9,43.7,46.3,42.8,46.6,41.9z"
              fillRule="evenodd"
            />
            <path
              className="ui-spinner_dark"
              clipRule="evenodd"
              d="M44.3,45.4c3.1,4.5,7.2,7.7,13.2,8.9c-3.2,5.1-5.1,5.5-9.2,2.1c-3.2-2.6-5.3-5.9-6.5-9.8C42.7,46.4,43.5,46,44.3,45.4z"
              fillRule="evenodd"
            />
            <path
              className="ui-spinner_dark"
              clipRule="evenodd"
              d="M40.1,46.9c-0.1,5.6,1.3,10.4,5.3,14.5c-5.6,2.6-7.2,2-8.6-3.3c-0.5-1.8-0.8-3.7-0.6-5.6c0.2-2,0.6-4.1,1.1-6.2c0.8,0.3,1.7,0.5,2.7,0.5H40.1z"
              fillRule="evenodd"
            />
            <path
              className="ui-spinner_dark"
              clipRule="evenodd"
              d="M36,45.5c-3.5,4.3-5,9.2-4.7,14.8c-5.7-1.2-6.8-2.7-4.9-7.3c1.1-2.5,2.6-4.8,4.4-6.8c0.9-1,2-1.9,3.3-2.8C34.6,44.3,35.2,45,36,45.5z"
              fillRule="evenodd"
            />
            <path
              className="ui-spinner_dark"
              clipRule="evenodd"
              d="M33.5,42.1c-5.6,1.5-9.8,4.5-12.8,9.5c-4-4.2-3.9-6.4,0.6-9.1c1.6-1,3.4-1.9,5.2-2.2c2.2-0.4,4.4-0.6,6.6-0.8l0,0.5C33.1,40.7,33.2,41.5,33.5,42.1z"
              fillRule="evenodd"
            />
            <path
              className="ui-spinner_darker"
              clipRule="evenodd"
              d="M33.5,37.9c-3.7-1.5-7.1-1.4-16,0c-1-4.9,0.3-6.5,5-6.6c4.7,0,8.8,1.6,12.4,4.1C34.2,36.2,33.8,37,33.5,37.9z"
              fillRule="evenodd"
            />
            <path
              className="ui-spinner_darker"
              clipRule="evenodd"
              d="M35.8,34.6c-3-4.7-7.3-7.8-13.2-9c3.4-5.2,5.2-5.5,9.5-1.9c3.2,2.6,5.2,5.9,6.5,9.6C37.5,33.5,36.6,34,35.8,34.6z"
              fillRule="evenodd"
            />
            <path
              className="ui-spinner_dark"
              clipRule="evenodd"
              d="M48,34.8c-0.5,0.7-1.4,1.1-2.1,1.6c-0.5-0.8-1.1-1.5-1.8-2c3.5-4.4,5.2-9.2,4.6-14.9c5.7,0.8,7.1,2.7,5.1,7.1C52.3,29.6,50,32.2,48,34.8z"
              fillRule="evenodd"
            />
            <path
              className="ui-spinner_dark"
              clipRule="evenodd"
              d="M46.9,40c0-0.8-0.1-1.5-0.4-2.2c5.8-1.6,10-4.7,13.1-9.6c4.4,6.1,3.2,6.4-1.3,9.5c-1.5,1-3.3,1.7-5,2c-2.1,0.4-4.2,0.6-6.4,0.8L46.9,40z"
              fillRule="evenodd"
            />
          </g>
          <circle
            className="ui-spinner_lighter"
            clipRule="evenodd"
            cx="40"
            cy="40"
            fillRule="evenodd"
            r="36"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="8"
          />
        </g>
      </svg>
    </div>
  );
  /* eslint-enable max-len */
}

Spinner.defaultProps = {
  size: 'm',
};

Spinner.propTypes = {
  /**
   * Custom class name
   */
  className: PropTypes.string,

  /**
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),

  /**
   * Spinner size.
   */
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),

};

export default Spinner;
