import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import Modal from '../../../components/modal/modal';

describe('Modal: render', () => {
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

  it('should render modal with custom title', () => {
    const title = (
      <h2>h2 Custom Title</h2>
    );
    const wrapper = shallow(
      <Modal
        active
        title={title}
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
