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

  it('should set state as active and return control if onElementShow callback does\'nt exist', () => {
    const onElementShow = jest.fn();
    const prototype = {
      props: {},
      setState: jest.fn(),
    };

    OverlayTrigger.prototype.showElement.call(prototype);

    expect(prototype.setState).toBeCalledWith({ active: true });
    expect(onElementShow).not.toBeCalled();
  });
});
