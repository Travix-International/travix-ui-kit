import OverlayTrigger from '../../../components/overlayTrigger/overlayTrigger';

describe('OverlayTrigger: addOutsideClickListener', () => {
  beforeEach(() => {
    document.body.addEventListener = jest.fn();
  });

  afterEach(() => {
    document.body.addEventListener.mockReset();
  });

  it('should set handleOutsideClick method as a listener to on body click', () => {
    const prototype = {
      handleOutsideClick: jest.fn(),
    };

    OverlayTrigger.prototype.addOutsideClickListener.call(prototype);

    expect(document.body.addEventListener).toBeCalledWith('click', prototype.handleOutsideClick);
  });
});
