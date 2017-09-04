import React from 'react';
import OverlayTrigger from '../../../components/overlayTrigger/overlayTrigger';

describe('OverlayTrigger: getOnClickTarget', () => {
  it('should return block with a corresponding onClick handler', () => {
    const prototype = {
      props: {
        сhildren: <div className="test-child" />,
      },
      toggleElement: jest.fn(),
    };

    const result = OverlayTrigger.prototype.getOnClickTarget.call(prototype);

    expect(result.props.onClick).toEqual(prototype.toggleElement);
  });
});
