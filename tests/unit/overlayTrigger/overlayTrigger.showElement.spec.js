import OverlayTrigger from '../../../components/overlayTrigger/overlayTrigger';

describe('OverlayTrigger: showElement', () => {
  it('should set state as active and call onElementShow callback if it exists', () => {
    const onElementShow = jest.fn();
    const prototype = {
      props: {
        onElementShow,
      },
      setState: jest.fn(),
    };

    OverlayTrigger.prototype.showElement.call(prototype);

    expect(prototype.setState).toBeCalledWith({ active: true });
    expect(onElementShow).toBeCalled();
  });
});
