import React from 'react';
import OverlayTrigger from '../overlayTrigger';

describe('OverlayTrigger: getOnClickTarget', () => {
  it('should return block with a corresponding onClick handler', () => {
    const toggleElement = jest.fn();

    const trigger = new OverlayTrigger({
      сhildren: <div className="test-child" />,
    });
    trigger.toggleElement = toggleElement;

    const result = trigger.getOnClickTarget();

    expect(result.props.onClick).toEqual(toggleElement);
  });
});
