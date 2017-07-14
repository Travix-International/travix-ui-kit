import React, { PropTypes } from 'react';
import { getClassNamesWithMods } from '../_helpers';

const className = getClassNamesWithMods('ui-messageBox', mods);
const MessageBox = ({ children, mods, type }) => {
  return (
    <div className="ui-messageBox">
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
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.oneOf(['info', 'error']),
};

MessageBox.defaultProps = {
  type: 'info',
};

export default MessageBox;
