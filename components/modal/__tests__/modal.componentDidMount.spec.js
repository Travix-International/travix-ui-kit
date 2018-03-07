import React from 'react';
import { mount } from 'enzyme';
import Modal from '../modal';

describe('Modal: handleOverlayClick', () => {
  const addEventListener = global.window.document.addEventListener;

  beforeEach(() => {
    global.window.document.addEventListener = jest.fn();
  });

  afterEach(() => {
    global.window.document.addEventListener = addEventListener;
  });

  it('should add "keydown" event listener if modal closable on ESC', () => {
    const onClose = jest.fn();
    mount(
      <Modal
        onClose={onClose}
      >
        Modal Content
      </Modal>
    );
    expect(global.window.document.addEventListener).toBeCalled();
  });

  it('should not add "keydown" event listener if modal is not closable on ESC', () => {
    mount(
      <Modal
        closeOnEsc={false}
      >
        Modal Content
      </Modal>
    );
    expect(global.window.document.addEventListener).not.toBeCalled();
  });

  it('should open the modal window if the active prop is set by default', () => {
    Modal.prototype.open = jest.fn();
    mount(<Modal active />);
    expect(Modal.prototype.open).toBeCalled();
  });
});
