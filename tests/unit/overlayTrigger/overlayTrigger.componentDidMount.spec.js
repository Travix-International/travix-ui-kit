import OverlayTrigger from '../../../components/overlayTrigger/overlayTrigger';

describe('OverlayTrigger: componentDidMount', () => {
  it('should call addOutsideClickListener if trigger action is click', () => {
    const prototype = {
      props: {
        triggerAction: 'click',
      },
      addOutsideClickListener: jest.fn(),
    };

    OverlayTrigger.prototype.componentDidMount.call(prototype);

    expect(prototype.addOutsideClickListener).toBeCalled();
  });

  it('should return control if trigger action is not click', () => {
    const prototype = {
      props: {
        triggerAction: 'hover',
      },
      addOutsideClickListener: jest.fn(),
    };

    OverlayTrigger.prototype.componentDidMount.call(prototype);

    expect(prototype.addOutsideClickListener).not.toBeCalled();
  });
});
