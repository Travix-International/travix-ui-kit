import React from 'react';
import { mount } from 'enzyme';
import Modal from '../../../components/modal/modal';

describe('Modal: componentWillUnmount', () => {
  const removeEventListener = global.window.document.removeEventListener;

  beforeEach(() => {
    global.window.document.removeEventListener = jest.fn();
  });

  afterEach(() => {
    global.window.document.removeEventListener = removeEventListener;
  });

  it('should remove "keydown" listener before unmount', () => {
    const wrapper = mount(
      <Modal
        active
      >
        Modal Content
      </Modal>
    );
    wrapper.unmount();
    expect(global.window.document.removeEventListener).toBeCalled();
  });
});
