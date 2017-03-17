import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Modal from '../../../components/modal/modal';

describe('Modal: handleOverlayClick', () => {
  it('should close on click overlay', () => {
    Modal.prototype.close = jest.fn();

    const component = shallow(
      <Modal
        active
      >
        Modal Content
      </Modal>
    );
    expect(Modal.prototype.close).not.toBeCalled();

    component.instance().handleOverlayClick();
    expect(Modal.prototype.close).toBeCalled();
  });

  it('should call "onOverlayClick" prop after click on overlay', () => {
    const onOverlayClick = jest.fn();

    const component = shallow(
      <Modal
        active
        closeOnOverlayClick={false}
        onOverlayClick={onOverlayClick}
      >
        Modal Content
      </Modal>
    );
    expect(onOverlayClick).not.toBeCalled();

    component.instance().handleOverlayClick();
    expect(onOverlayClick).toBeCalled();
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
