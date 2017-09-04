import React from 'react';
import OverlayTrigger from '../../../components/overlayTrigger/overlayTrigger';

describe('OverlayTrigger: getOnHoverTarget', () => {
  it('should return block with a corresponding onMouseOver and onMouseOut handlers', () => {
    const prototype = {
      props: {
        сhildren: <div className="test-child" />,
      },
      toggleElement: jest.fn(),
    };

    const result = OverlayTrigger.prototype.getOnHoverTarget.call(prototype);

    expect(result.props.onMouseOver).toEqual(prototype.toggleElement);
    expect(result.props.onMouseOut).toEqual(prototype.toggleElement);
  });
});
