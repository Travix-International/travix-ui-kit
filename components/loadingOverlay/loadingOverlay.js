import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { getClassNamesWithMods } from '../_helpers';
import { Spinner } from '../';

const LoadingOverlay = ({
  children,
  className,
  loading,
  message,
  messageDirection,
  spinner,
  transparency,
}) => {
  if (!children) {
    return null;
  }

  let loadingSection = null;

  const spinnerComponent = (
    <Spinner size="s"/>
  );

  if (loading) {
    loadingSection = (
      <div
        className="ui-loading-overlay__loading-container"
        className={
          getClassNamesWithMods(
            'ui-loading-overlay__loading-container',
            [spinner && message && `message-${messageDirection}`]
          )
        }
      >
        {spinner && spinnerComponent}
        <span
          className={
            getClassNamesWithMods('ui-loading-overlay__loading-message', [spinner && message && messageDirection])
          }
        >
          {message}
        </span>
      </div>
    );
  }

  return (
    <div
      className={
        classnames(
          getClassNamesWithMods('ui-loading-overlay', { loading, transparent: transparency }),
          className
        )
      }
    >
      {loadingSection}
      <div className="ui-loading-overlay__content">
        {children}
      </div>
    </div>
  );
};

LoadingOverlay.defaultProps = {
  loading: false,
  message: '',
  messageDirection: 'right',
  spinner: true,
  transparency: false,
};

LoadingOverlay.propTypes = {
  /**
   * Child component(s) which will be wrapped into the loading section.
   */
  children: PropTypes.node.isRequired,
  /**
   * Custom className that can be passed to the root wrapper container.
   */
  className: PropTypes.string,
  /**
   * If loading is enabled, it'll show the overlay and, optionally, spinner / message. If not, then content.
   */
  loading: PropTypes.bool,
  /**
   * Simple text to be shown next to the spinner or instead.
   */
  message: PropTypes.node,
  /**
   * Message position relatively to the spinner if any.
   */
  messageDirection: PropTypes.oneOf(['right', 'left', 'top', 'bottom']),
  /**
   * Determines whether to show spinner component while loading or not.
   */
  spinner: PropTypes.bool,
  /**
   * Enable transparency for the loading section. You will partially see the content while loading.
   */
  transparency: PropTypes.bool,
};

export default LoadingOverlay;
