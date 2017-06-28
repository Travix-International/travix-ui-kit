import { mount } from 'enzyme';
import React from 'react';
import SlidingPanel from '../../../components/slidingPanel/slidingPanel';

jest.useFakeTimers();

describe('SlidingPanel', () => {
  describe('#render()', () => {
    it('render with default props and mods provided', () => {
      const renderTree = mount(
        <SlidingPanel mods={['test']}>Test</SlidingPanel>
      );

      const overlayElement = renderTree.find('.ui-sliding-panel-overlay');
      const panelElement = overlayElement.find('.ui-sliding-panel');

      jest.runAllTimers();


      expect(renderTree).toMatchSnapshot();
      expect(overlayElement.hasClass('ui-sliding-panel-overlay_hidden')).toEqual(true);
      expect(panelElement.hasClass('ui-sliding-panel_test')).toEqual(true);
      expect(panelElement.text()).toEqual('Test');
    });

    it('render active by default and when clicking on the overlay it closes it', () => {
      const renderTree = mount(
        <SlidingPanel active>Test</SlidingPanel>
      );

      jest.runAllTimers();

      const overlayElement = renderTree.find('.ui-sliding-panel-overlay');
      const panelElement = overlayElement.find('.ui-sliding-panel');

      expect(renderTree).toMatchSnapshot();
      expect(overlayElement.hasClass('ui-sliding-panel-overlay_hidden')).toEqual(false);
      expect(panelElement.hasClass('ui-sliding-panel_active')).toEqual(true);

      overlayElement.simulate('click');
      renderTree.instance().handleTransitionEnd({ propertyName: 'transform' });
      jest.runAllTimers();

      jest.runAllTimers();

      expect(renderTree).toMatchSnapshot();
      expect(overlayElement.hasClass('ui-sliding-panel-overlay_hidden')).toEqual(true);
      expect(panelElement.hasClass('ui-sliding-panel_active')).toEqual(false);
    });

    it('render active by default but with closeOnOverlayClick=false does not close when overlay clicked', () => {
      const renderTree = mount(
        <SlidingPanel active closeOnOverlayClick={false}>Test</SlidingPanel>
      );

      jest.runAllTimers();

      const overlayElement = renderTree.find('.ui-sliding-panel-overlay');
      const panelElement = overlayElement.find('.ui-sliding-panel');

      expect(renderTree).toMatchSnapshot();
      expect(overlayElement.hasClass('ui-sliding-panel-overlay_hidden')).toEqual(false);
      expect(panelElement.hasClass('ui-sliding-panel_active')).toEqual(true);

      overlayElement.simulate('click');

      jest.runAllTimers();

      expect(renderTree).toMatchSnapshot();
      expect(overlayElement.hasClass('ui-sliding-panel-overlay_hidden')).toEqual(false);
      expect(panelElement.hasClass('ui-sliding-panel_active')).toEqual(true);
    });

    it('calls onOpen and onClose functions when provided via props', () => {
      const onCloseMock = jest.fn();
      const onOpenMock = jest.fn();

      const renderTree = mount(
        <SlidingPanel active onClose={onCloseMock} onOpen={onOpenMock}>Test</SlidingPanel>
      );
      const overlayElement = renderTree.find('.ui-sliding-panel-overlay');

      jest.runAllTimers();
      expect(onOpenMock.mock.calls.length).toEqual(1);

      overlayElement.simulate('click');

      jest.runAllTimers();
      expect(onCloseMock.mock.calls.length).toEqual(1);
    });

    it('enables [rel="close"] element provided on the children, that closes the overlay', () => {
      document.body.insertAdjacentHTML('afterbegin', '<div id="root"></div>');
      const renderTree = mount(
        <SlidingPanel active closeOnOverlayClick={false}>
          <button rel="close">Test</button>
        </SlidingPanel>
      , { attachTo: document.body.querySelector('#root') });
      const overlayElement = renderTree.find('.ui-sliding-panel-overlay');
      const panelElement = overlayElement.find('.ui-sliding-panel');

      jest.runAllTimers();

      const closeButtonElement = document.querySelector('.ui-sliding-panel_active [rel="close"]');

      expect(renderTree).toMatchSnapshot();
      expect(overlayElement.hasClass('ui-sliding-panel-overlay_hidden')).toEqual(false);
      expect(panelElement.hasClass('ui-sliding-panel_active')).toEqual(true);

      closeButtonElement.dispatchEvent(new Event('click'));

      renderTree.instance().handleTransitionEnd({ propertyName: 'transform' });
      jest.runAllTimers();

      expect(renderTree).toMatchSnapshot();
      expect(overlayElement.hasClass('ui-sliding-panel-overlay_hidden')).toEqual(true);
      expect(panelElement.hasClass('ui-sliding-panel_active')).toEqual(false);

      renderTree.detach();
    });

    it('opens the panel when active prop changes to true', () => {
      document.body.insertAdjacentHTML('afterbegin', '<div id="root"></div>');
      const renderTree = mount(
        <SlidingPanel>Test</SlidingPanel>
      );
      const overlayElement = renderTree.find('.ui-sliding-panel-overlay');
      const panelElement = overlayElement.find('.ui-sliding-panel');

      jest.runAllTimers();

      expect(renderTree).toMatchSnapshot();
      expect(overlayElement.hasClass('ui-sliding-panel-overlay_hidden')).toEqual(true);
      expect(panelElement.hasClass('ui-sliding-panel_active')).toEqual(false);

      renderTree.setProps({ active: true });

      jest.runAllTimers();
      renderTree.instance().handleTransitionEnd({ propertyName: 'transform' });

      expect(renderTree).toMatchSnapshot();
      expect(overlayElement.hasClass('ui-sliding-panel-overlay_hidden')).toEqual(false);
      expect(panelElement.hasClass('ui-sliding-panel_active')).toEqual(true);
    });

    it('closes the panel when active prop changes to false', () => {
      const renderTree = mount(
        <SlidingPanel active>Test</SlidingPanel>
      );
      const overlayElement = renderTree.find('.ui-sliding-panel-overlay');
      const panelElement = overlayElement.find('.ui-sliding-panel');

      jest.runAllTimers();

      expect(renderTree).toMatchSnapshot();
      expect(overlayElement.hasClass('ui-sliding-panel-overlay_hidden')).toEqual(false);
      expect(panelElement.hasClass('ui-sliding-panel_active')).toEqual(true);

      renderTree.setProps({ active: false });

      renderTree.instance().handleTransitionEnd({ propertyName: 'transform' });
      jest.runAllTimers();

      expect(renderTree).toMatchSnapshot();
      expect(overlayElement.hasClass('ui-sliding-panel-overlay_hidden')).toEqual(true);
      expect(panelElement.hasClass('ui-sliding-panel_active')).toEqual(false);
    });

    it('ignores the new active prop value if its the same as the state', () => {
      const renderTree = mount(
        <SlidingPanel active>Test</SlidingPanel>
      );
      const instance = renderTree.instance();

      jest.runAllTimers();

      instance.handleClose = jest.fn();
      instance.handleOpen = jest.fn();

      renderTree.setProps({ active: true });

      expect(instance.handleClose.mock.calls.length).toEqual(0);
      expect(instance.handleOpen.mock.calls.length).toEqual(0);
    });

    it('ignores the transitionend event when it is not related to the transform CSS prop', () => {
      const renderTree = mount(
        <SlidingPanel active>Test</SlidingPanel>
      );
      const instance = renderTree.instance();

      jest.runAllTimers();

      instance.setState = jest.fn();

      instance.handleTransitionEnd({ propertyName: 'fakeProp' });

      expect(instance.setState.mock.calls.length).toEqual(0);
    });
  });
});
