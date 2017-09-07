import OverlayTrigger from '../../../components/overlayTrigger/overlayTrigger';

describe('OverlayTrigger: toggleElement', () => {
  it('should call hideElement if state is active ', () => {
    const prototype = {
      hideElement: jest.fn(),
      showElement: jest.fn(),
    };

    OverlayTrigger.prototype = prototype;

    const trigger = new OverlayTrigger();

    trigger.state = {
      active: true,
    };

    trigger.toggleElement();

    expect(prototype.showElement).not.toBeCalled();
    expect(prototype.hideElement).toBeCalled();
  });

  it('should call showElement if state is not active', () => {
    const prototype = {
      hideElement: jest.fn(),
      showElement: jest.fn(),
    };

    OverlayTrigger.prototype = prototype;

    const trigger = new OverlayTrigger();

    trigger.state = {
      active: false,
    };

    trigger.toggleElement();

    expect(prototype.showElement).toBeCalled();
    expect(prototype.hideElement).not.toBeCalled();
  });
});
