import React from 'react';
import OverlayTrigger from '../../../components/overlayTrigger/overlayTrigger';

describe('OverlayTrigger: linkChild', () => {
  it('should link passed ref to `this`', () => {
    const node = <div />;

    const trigger = new OverlayTrigger();

    trigger.linkChild(node);

    expect(trigger.elem).toEqual(node);
  });
});
