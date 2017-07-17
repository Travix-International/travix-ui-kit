import React, { PropTypes } from 'react';
import { getClassNamesWithMods } from '../_helpers';

const MessageBox = ({ children, mods, type }) => {
  const messageMods = mods ? mods.slice() : [];
  if (type) {
    messageMods.push(`type_${type}`);
  }

  const className = getClassNamesWithMods('ui-messageBox', messageMods);

  return (
    <div className={className}>
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
  type: PropTypes.oneOf(['', 'info', 'error']),
};

MessageBox.defaultProps = {
  type: '',
};

export default MessageBox;
