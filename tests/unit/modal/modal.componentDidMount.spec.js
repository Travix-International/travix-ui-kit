import React from 'react';
import { mount } from 'enzyme';
import Modal from '../../../components/modal/modal';

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
        active
        onClose={onClose}
      >
        Modal Content
      </Modal>
    );
    expect(global.window.document.addEventListener).toBeCalled();
  });
});
