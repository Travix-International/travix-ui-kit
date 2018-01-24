import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { getDataAttributes } from '../_helpers';

const SelectionBlock = (props) => {
  const {
    align = 'center',
    children,
    className,
    dataAttrs = {},
    icon,
    logo,
    logoLabel,
    subtitle,
    title,
    type = 'horizontal',
  } = props;

  const logoSection = !logo ? null : (
    <div className="ui-selection-block__logo">
      <span className="ui-selection-block__logo-label">
        {logoLabel}
      </span>
      {logo}
    </div>
  );

  const iconSection = !icon ? null : (
    <div className="ui-selection-block__icon">
      {icon}
    </div>
  );

  const classes = classnames(className, 'ui-selection-block', {
    'ui-selection-block_vertical': type === 'vertical',
    [`ui-selection-block_align-${align}`]: true,
  });

  return (
    <div
      className={classes}
      {...getDataAttributes(dataAttrs)}
    >
      <div className="ui-selection-block__section">
        <header className="ui-selection-block__header">
          <div className="ui-selection-block__titles">
            {iconSection}
            <h2 className="ui-selection-block__title">
              {title}
            </h2>
            <h5 className="ui-selection-block__subtitle">
              {subtitle}
            </h5>
          </div>
          {logoSection}
        </header>
        <div className="ui-selection-block__body">
          {children}
        </div>
      </div>
      {logoSection}
    </div>
  );
};

SelectionBlock.propTypes = {
  /**
   * The title section align.
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * Content that will be wrapped by SelectionBlock
   */
  children: PropTypes.node,
  /**
   * Specify a CSS class
   */
  className: PropTypes.string,
  /**
   * Data attribute. You can use it to set up any custom data-* attribute.
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  /**
   * The icon for title section.
   */
  icon: PropTypes.node,
  /**
   * The selection block logo.
   */
  logo: PropTypes.node,
  /**
   * The logo label.
   */
  logoLabel: PropTypes.string,
  /**
   * The selection block subtitle.
   */
  subtitle: PropTypes.string,
  /**
   * The selection block title.
   */
  title: PropTypes.string,
  /**
   * The selection block type.
   */
  type: PropTypes.oneOf(['vertical', 'horizontal']),
};

export default SelectionBlock;
