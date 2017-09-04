import OverlayTrigger from '../../../components/overlayTrigger/overlayTrigger';

describe('OverlayTrigger: handleOutsideClick', () => {
  it('should return control if target matches with content', () => {
    const prototype = {
      elem: {
        contains: jest.fn().mockReturnValue(true),
      },
      hideElement: jest.fn(),
    };

    OverlayTrigger.prototype = prototype;

    const trigger = new OverlayTrigger();

    trigger.handleOutsideClick({ target: {} });

    expect(prototype.hideElement).not.toBeCalled();
  });

  it('should call hideElement if target does\'nt match with content and state is active', () => {
    const prototype = {
      elem: {
        contains: jest.fn().mockReturnValue(false),
      },
      hideElement: jest.fn(),
    };

    OverlayTrigger.prototype = prototype;

    const trigger = new OverlayTrigger();

    trigger.state = {
      active: true,
    };

    trigger.handleOutsideClick({ target: {} });

    expect(prototype.hideElement).toBeCalled();
  });

  it('should return control if target does\'nt match with content but state is not active', () => {
    const prototype = {
      elem: {
        contains: jest.fn().mockReturnValue(false),
      },
      hideElement: jest.fn(),
    };

    OverlayTrigger.prototype = prototype;

    const trigger = new OverlayTrigger();

    trigger.state = {
      active: false,
    };

    trigger.handleOutsideClick({ target: {} });

    expect(prototype.hideElement).not.toBeCalled();
  });
});
