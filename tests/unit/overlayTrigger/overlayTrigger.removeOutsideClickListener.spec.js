import OverlayTrigger from '../../../components/overlayTrigger/overlayTrigger';

describe('OverlayTrigger: removeOutsideClickListener', () => {
  beforeEach(() => {
    document.body.removeEventListener = jest.fn();
  });

  afterEach(() => {
    document.body.removeEventListener.mockReset();
  });

  it('should remove on body click handler', () => {
    const prototype = {
      handleOutsideClick: jest.fn(),
    };

    OverlayTrigger.prototype.removeOutsideClickListener.call(prototype);

    expect(document.body.removeEventListener).toBeCalledWith('click', prototype.handleOutsideClick);
  });
});
