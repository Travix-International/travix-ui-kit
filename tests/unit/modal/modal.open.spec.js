import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../components/modal/modal';

describe('Modal: open', () => {
  const requestAnimationFrame = global.window.requestAnimationFrame;
  jest.useFakeTimers();

  beforeEach(() => {
    global.window.requestAnimationFrame = (cb) => { cb(); };
  });

  afterEach(() => {
    global.window.requestAnimationFrame = requestAnimationFrame;
  });

  it('should change state "isOpen" in setTimeout', () => {
    const onClose = jest.fn();
    const component = shallow(
      <Modal
        active
        onClose={onClose}
      >
        Modal Content
      </Modal>
    );
    expect(component.state().isOpen).toBe(false);
    component.instance().open();

    expect(setTimeout.mock.calls[0][1]).toBe(0);

    jest.runAllTimers();
    expect(component.state().isOpen).toBe(true);
  });
});
