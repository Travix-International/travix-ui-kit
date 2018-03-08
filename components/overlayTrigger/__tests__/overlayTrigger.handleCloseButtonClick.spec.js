import OverlayTrigger from '../overlayTrigger';

describe('OverlayTrigger: handleCloseButtonClick', () => {
  it('should call hideElement method', () => {
    const prototype = {
      hideElement: jest.fn(),
    };

    OverlayTrigger.prototype = prototype;
    const trigger = new OverlayTrigger();
    trigger.handleCloseButtonClick();

    expect(prototype.hideElement).toBeCalled();
  });
});
