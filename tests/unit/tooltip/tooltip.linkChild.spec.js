import React from 'react';
import Tooltip from '../../../components/tooltip/tooltip';

describe('Tooltip: linkChild', () => {
  it('should link passed ref to `this`', () => {
    const node = <div />;

    const tooltip = new Tooltip();

    tooltip.linkChild(node);

    expect(tooltip.container).toEqual(node);
  });
});
