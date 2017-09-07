import OverlayTrigger from '../../../components/overlayTrigger/overlayTrigger';

describe('OverlayTrigger: hideElement', () => {
  it('should set state as inactive and call onElementHide callback if it exists', () => {
    const onElementHide = jest.fn();
    const prototype = {
      props: {
        onElementHide,
      },
      setState: jest.fn(),
    };

    OverlayTrigger.prototype.hideElement.call(prototype);

    expect(prototype.setState).toBeCalledWith({ active: false });
    expect(onElementHide).toBeCalled();
  });
});
