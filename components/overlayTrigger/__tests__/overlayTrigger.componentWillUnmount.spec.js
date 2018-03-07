import OverlayTrigger from '../overlayTrigger';

describe('OverlayTrigger: componentWillUnmount', () => {
  it('should call removeOutsideClickListener if trigger action is click', () => {
    const prototype = {
      props: {
        triggerAction: 'click',
      },
      removeOutsideClickListener: jest.fn(),
    };

    OverlayTrigger.prototype.componentWillUnmount.call(prototype);

    expect(prototype.removeOutsideClickListener).toBeCalled();
  });

  it('should return control if trigger action is not click', () => {
    const prototype = {
      props: {
        triggerAction: 'hover',
      },
      removeOutsideClickListener: jest.fn(),
    };

    OverlayTrigger.prototype.componentWillUnmount.call(prototype);

    expect(prototype.removeOutsideClickListener).not.toBeCalled();
  });
});
