import React, { PropTypes } from 'react';
import { getClassNamesWithMods, getDataAttributes } from '../_helpers';

const MessageBox = (props) => {
  const { children, dataAttrs, isError } = props;
  const mods = props.mods ? props.mods.slice() : [];

  if (isError) {
    mods.push(`error`);
  }

  const className = getClassNamesWithMods('ui-messageBox', mods);

  return (
    <div {...getDataAttributes(dataAttrs)} className={className}>
      {children}
    </div>
  );
};

MessageBox.propTypes = {
  /**
   * Content that will be wrapped by MessageBox
   */
  children: PropTypes.node,

  /**
   * Data attribute. You can use it to set up any custom data-* attribute.
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),

  /**
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),

  /**
   * Set to true if this represents an error message.
   */
  isError: PropTypes.bool,
};

MessageBox.defaultProps = {
  isError: false,
};

export default MessageBox;
