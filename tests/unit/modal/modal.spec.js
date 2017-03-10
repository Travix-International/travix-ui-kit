import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import Modal from '../../../components/modal/modal';

describe('Modal', () => {
  describe('#render()', () => {
    const addEventListener = global.window.document.addEventListener;
    const removeEventListener = global.window.document.removeEventListener;

    beforeEach(() => {
      global.window.document.addEventListener = jest.fn();
      global.window.document.removeEventListener = jest.fn();
      global.window.requestAnimationFrame = (cb) => { cb(); };
    });

    afterEach(() => {
      global.window.document.addEventListener = addEventListener;
      global.window.document.removeEventListener = removeEventListener;
    });

    it('should return base active modal with close button', () => {
      const component = shallow(
        <Modal active>
          Modal Content
        </Modal>
      );
      expect(shallowToJson(component)).toMatchSnapshot();
    });

    it('should return active modal with title and footer', () => {
      const modalTitle = 'Test Modal Title';
      const modalFooter = <div>Test Modal Footer</div>;
      const wrapper = shallow(
        <Modal
          active
          footer={modalFooter}
          title={modalTitle}
        >
          Modal Content
        </Modal>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render non closable modal', () => {
      const wrapper = shallow(
        <Modal
          active
          closable={false}
          closeOnEsc={false}
          closeOnOverlayClick={false}
        >
          Modal Content
        </Modal>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render fullscreen modal', () => {
      const wrapper = shallow(
        <Modal
          active
          fullscreen
        >
          Modal Content
        </Modal>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render modal without overlay', () => {
      const wrapper = shallow(
        <Modal
          active
          overlay={false}
        >
          Modal Content
        </Modal>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render empty modal when status is not active', () => {
      const wrapper = shallow(
        <Modal
          active={false}
        >
          Modal Content
        </Modal>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render closable modal with close button text', () => {
      const wrapper = shallow(
        <Modal
          active
          closeButtonText="Close"
        >
          Modal Content
        </Modal>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render inactive modal', () => {
      const wrapper = shallow(
        <Modal
          active={false}
        >
          Modal Content
        </Modal>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render modal with custom header', () => {
      const wrapper = shallow(
        <Modal
          active
          title={<header><h1>Custom Title</h1></header>}
        >
          Modal Content
        </Modal>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render modal with custom footer', () => {
      const wrapper = shallow(
        <Modal
          active
          footer={<footer><p>Custom footer</p></footer>}
        >
          Modal Content
        </Modal>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
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

    it('should open/close modal when "active" props was changed', () => {
      const wrapper = shallow(
        <Modal
          active
        >
          Modal Content
        </Modal>
      );
      wrapper.setProps({ active: false });
      wrapper.setProps({ active: true });
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

    it('should add correct className after change state to "open"', () => {
      const component = shallow(
        <Modal
          active
        >
          Modal Content
        </Modal>
      );
      expect(component.state().isOpen).toBe(false);

      component.setState({ isOpen: true });

      expect(component.state().isOpen).toBe(true);
      expect(shallowToJson(component)).toMatchSnapshot();
    });
  });
});
