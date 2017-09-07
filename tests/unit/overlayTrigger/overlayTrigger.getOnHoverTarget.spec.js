import React from 'react';
import OverlayTrigger from '../../../components/overlayTrigger/overlayTrigger';

describe('OverlayTrigger: getOnHoverTarget', () => {
  it('should return block with a corresponding onMouseOver and onMouseOut handlers', () => {
    const toggleElement = jest.fn();

    const trigger = new OverlayTrigger({
      сhildren: <div className="test-child" />,
    });
    trigger.toggleElement = toggleElement;

    const result = trigger.getOnHoverTarget();

    expect(result.props.onMouseOver).toEqual(toggleElement);
    expect(result.props.onMouseOut).toEqual(toggleElement);
  });
});
