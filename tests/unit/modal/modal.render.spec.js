import { mount } from 'enzyme';
import React from 'react';
import Modal from '../../../components/modal/modal';

describe('Modal: render', () => {
  const requestAnimationFrame = global.window.requestAnimationFrame;

  beforeEach(() => {
    global.window.requestAnimationFrame = (cb) => { cb(); };
  });

  afterEach(() => {
    global.window.requestAnimationFrame = requestAnimationFrame;
  });

  it('should return base active modal with close button', () => {
    const component = mount(
      <Modal active onClose={() => {}} title="Title">
        Modal Content
      </Modal>
    );

    expect(component).toMatchSnapshot();
  });

  it('should return active modal with title and footer', () => {
    const modalTitle = 'Test Modal Title';
    const modalFooter = <div>Test Modal Footer</div>;
    const wrapper = mount(
      <Modal
        active
        footer={modalFooter}
        title={modalTitle}
      >
        Modal Content
      </Modal>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render non closable modal', () => {
    const wrapper = mount(
      <Modal
        active
        closable={false}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        Modal Content
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render fullscreen modal', () => {
    const wrapper = mount(
      <Modal
        active
        fullscreen
      >
        Modal Content
      </Modal>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render modal without overlay', () => {
    const wrapper = mount(
      <Modal
        active
        overlay={false}
      >
        Modal Content
      </Modal>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render modal with custom mods', () => {
    const wrapper = mount(
      <Modal
        active
        mods={['my-custom-mod']}
      >
        Modal Content
      </Modal>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render empty modal when status is not active', () => {
    const wrapper = mount(
      <Modal
        active={false}
      >
        Modal Content
      </Modal>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render closable modal with close button text', () => {
    const wrapper = mount(
      <Modal
        active
        closeButtonText="Close"
      >
        Modal Content
      </Modal>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render inactive modal', () => {
    const wrapper = mount(
      <Modal
        active={false}
      >
        Modal Content
      </Modal>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render modal with custom title', () => {
    const title = (
      <h2>h2 Custom Title</h2>
    );
    const wrapper = mount(
      <Modal
        active
        title={title}
      >
        Modal Content
      </Modal>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render modal with custom header', () => {
    const wrapper = mount(
      <Modal
        active
        title={<header><h1>Custom Title</h1></header>}
      >
        Modal Content
      </Modal>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render modal with custom footer', () => {
    const wrapper = mount(
      <Modal
        active
        footer={<footer><p>Custom footer</p></footer>}
      >
        Modal Content
      </Modal>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should add correct className after change state to "open"', () => {
    const component = mount(
      <Modal
        active
      >
        Modal Content
      </Modal>
    );
    expect(component.state().isOpen).toBe(false);

    component.setState({ isOpen: true });

    expect(component.state().isOpen).toBe(true);
    expect(component).toMatchSnapshot();
  });

  it('should render modal with provided className', () => {
    const wrapper = mount(
      <Modal
        active
        className="test-cls"
      >
        Modal Content
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render modal with provided dataAttrs', () => {
    const wrapper = mount(
      <Modal
        active
        dataAttrs={{ gtm: 'id' }}
      >
        Modal Content
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render small modal', () => {
    const wrapper = mount(
      <Modal
        isSmall
      >
        Modal Content
      </Modal>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
