import React from 'react';
import PropTypes from 'prop-types';
import OriginalLogoRenderer from 'react-styleguidist/lib/rsg-components/Logo';

import Themes from './themes';

function LogoRenderer({ children }) {
  return (
    <div>
      <OriginalLogoRenderer>
        {children}
      </OriginalLogoRenderer>
      <Themes />
    </div>
  );
}

LogoRenderer.propTypes = {
  children: PropTypes.node,
};

export default LogoRenderer;
