import { mount } from 'enzyme';
import React from 'react';
import ModalContent from '../../../components/modal/modalContent';

describe('Modal: render', () => {
  const requestAnimationFrame = global.window.requestAnimationFrame;

  beforeEach(() => {
    global.window.requestAnimationFrame = (cb) => { cb(); };
  });

  afterEach(() => {
    global.window.requestAnimationFrame = requestAnimationFrame;
  });

  it('Should redner modal content', () => {
    const component = mount(
      <ModalContent>
        Modal Content
      </ModalContent>
    );

    expect(component).toMatchSnapshot();
  });

  it('Should redner modal content with title', () => {
    const component = mount(
      <ModalContent title="Modal content title">
        Modal Content
      </ModalContent>
    );

    expect(component).toMatchSnapshot();
  });

  it('Should redner modal content with title and subtitle', () => {
    const component = mount(
      <ModalContent title="Modal content title" subtitle="Modal content subtitle">
        Modal Content
      </ModalContent>
    );

    expect(component).toMatchSnapshot();
  });

  it('Should not redner header if only subtitle is passed', () => {
    const component = mount(
      <ModalContent subtitle="Modal content subtitle">
        Modal Content
      </ModalContent>
    );

    expect(component).toMatchSnapshot();
  });
});
