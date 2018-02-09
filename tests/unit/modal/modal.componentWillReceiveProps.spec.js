import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../components/modal/modal';

describe('Modal: componentWillReceiveProps', () => {
  it('should open/close modal when "active" prop was changed', () => {
    Modal.prototype.open = jest.fn();
    Modal.prototype.close = jest.fn();

    const component = shallow(
      <Modal
        active={false}
      >
        Modal Content
      </Modal>
    );
    expect(Modal.prototype.open).not.toBeCalled();
    expect(Modal.prototype.close).not.toBeCalled();

    component.setProps({ active: true });
    expect(Modal.prototype.open).toBeCalled();

    component.setProps({ active: false });
    setTimeout(() => expect(Modal.prototype.close).toBeCalled(), 0);
  });

  it('should not open/close modal when "active" prop was not changed', () => {
    Modal.prototype.open = jest.fn();
    Modal.prototype.close = jest.fn();

    const component = shallow(
      <Modal
        active={false}
      >
        Modal Content
      </Modal>
    );
    expect(Modal.prototype.open).not.toBeCalled();
    expect(Modal.prototype.close).not.toBeCalled();

    component.setProps({ active: false });
    expect(Modal.prototype.open).not.toBeCalled();
    expect(Modal.prototype.close).not.toBeCalled();
  });

  it('should not close modal when "active" is false', () => {
    Modal.prototype.open = jest.fn();
    Modal.prototype.close = jest.fn();

    const component = shallow(
      <Modal
        active
      >
        Modal Content
      </Modal>
    );

    expect(Modal.prototype.close).not.toBeCalled();
    component.find('.ui-modal__overlay').simulate('click');

    component.setProps({ active: false });
    setTimeout(() => expect(Modal.prototype.close).not.toBeCalled(), 0);
  });
});
