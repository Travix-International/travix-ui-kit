import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../modal';

describe('Modal: handleClose', () => {
  it('should close on Close button', () => {
    Modal.prototype.close = jest.fn();

    const component = shallow(
      <Modal
        active
      >
        Modal Content
      </Modal>
    );
    expect(Modal.prototype.close).not.toBeCalled();

    component.instance().handleClose();
    expect(Modal.prototype.close).toBeCalled();
  });
});
