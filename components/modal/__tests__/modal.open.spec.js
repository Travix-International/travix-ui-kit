import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../modal';

describe('Modal: open', () => {
  const requestAnimationFrame = global.window.requestAnimationFrame;
  jest.useFakeTimers();

  beforeEach(() => {
    global.window.requestAnimationFrame = (cb) => { cb(); };
  });

  afterEach(() => {
    global.window.requestAnimationFrame = requestAnimationFrame;
  });

  it('should change state "isOpen" in setTimeout with given delay', () => {
    const onClose = jest.fn();
    const component = shallow(
      <Modal
        active
        delay={250}
        onClose={onClose}
      >
        Modal Content
      </Modal>
    );
    expect(component.state().isOpen).toBe(false);
    expect(component.state().isActive).toBe(true);
    component.instance().open();

    expect(setTimeout.mock.calls[0][1]).toBe(250);

    jest.runAllTimers();
    expect(component.state().isOpen).toBe(true);
    expect(component.state().isActive).toBe(true);
  });
});
