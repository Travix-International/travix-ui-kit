import OverlayTrigger from '../../../components/overlayTrigger/overlayTrigger';

describe('OverlayTrigger: handleCloseButtonClick', () => {
  it('should call hideElement method', () => {
    const prototype = {
      hideElement: jest.fn(),
    };

    OverlayTrigger.prototype.handleCloseButtonClick.call(prototype);

    expect(prototype.hideElement).toBeCalled();
  });
});
