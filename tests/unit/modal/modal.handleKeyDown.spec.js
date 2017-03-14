import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../components/modal/modal';

describe('Modal: handleKeyDown', () => {
  it('should close on Esc key event', () => {
    Modal.prototype.close = jest.fn();

    const component = shallow(
      <Modal
        active
      >
        Modal Content
      </Modal>
    );
    expect(Modal.prototype.close).not.toBeCalled();

    component.instance().handleKeyDown({ keyCode: 25 });
    expect(Modal.prototype.close).not.toBeCalled();

    component.instance().handleKeyDown({ keyCode: 27 });
    expect(Modal.prototype.close).toBeCalled();
  });
});
