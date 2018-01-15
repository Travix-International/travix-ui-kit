import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

const MessageBox = (props) => {
  const {
    children,
    className,
    dataAttrs,
    icon,
    mods,
    title,
    type,
  } = props;
  const classNames = classnames(getClassNamesWithMods('ui-messageBox', [...mods, type]), className);

  const logo = icon && (
    <div className="ui-messageBox__content-icon">
      {icon}
    </div>
  );

  const header = title && (
    <div className="ui-messageBox__content-title">
      {title}
    </div>
  );

  return (
    <div {...getDataAttributes(dataAttrs)} className={classNames}>
      {logo}
      <div className="ui-messageBox__content">
        {header}
        <div className="ui-messageBox__content-body">
          {children}
        </div>
      </div>
    </div>
  );
};

MessageBox.propTypes = {
  /**
   * Content that will be wrapped by MessageBox
   */
  children: PropTypes.node,

  /**
   * Custom classname
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
   * Icon of MessageBox
   */
  icon: PropTypes.node,

  /**
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),

  /**
   * Title of MessageBox
   */
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),

  /**
   * Type of MessageBox
   */
  type: PropTypes.oneOf(['info', 'success', 'error']),
};

MessageBox.defaultProps = {
  icon: null,
  mods: [],
  title: null,
  type: 'info',
};

export default MessageBox;
