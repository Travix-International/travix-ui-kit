import { mount } from 'enzyme';
import React from 'react';
import Swipe from '../../../components/swipe/swipe';

describe('Swipe', () => {
  describe('#render()', () => {
    it('render with default props and mods', () => {
      const renderTree = mount(
        <Swipe mods={['small']}>
          <h1>The content</h1>
        </Swipe>
      );

      expect(renderTree).toMatchSnapshot();
      expect(renderTree.hasClass('ui-swipe_small')).toEqual(true);
    });
    it('fires left callback on gesture', () => {
      const callback = jest.fn();

      const renderTree = mount(
        <Swipe onLeft={callback}>
          <h1>The content</h1>
        </Swipe>
      );

      const instance = renderTree.instance();
      instance.handleStart({ clientX: 200, clientY: 10 });
      instance.handleMove({ clientX: 100, clientY: 10 });
      instance.handleEnd();
      expect(callback.mock.calls.length).toEqual(1);
    });

    it('fires right callback on gesture', () => {
      const callback = jest.fn();

      const renderTree = mount(
        <Swipe onRight={callback}>
          <h1>The content</h1>
        </Swipe>
      );

      const instance = renderTree.instance();
      instance.handleStart({ clientX: 100, clientY: 10 });
      instance.handleMove({ clientX: 200, clientY: 10 });
      instance.handleEnd();
      expect(callback.mock.calls.length).toEqual(1);
    });

    it('fires up callback on gesture', () => {
      const callback = jest.fn();

      const renderTree = mount(
        <Swipe onUp={callback}>
          <h1>The content</h1>
        </Swipe>
      );

      const instance = renderTree.instance();
      instance.handleStart({ clientX: 10, clientY: 100 });
      instance.handleMove({ clientX: 10, clientY: 10 });
      instance.handleEnd();
      expect(callback.mock.calls.length).toEqual(1);
    });

    it('fires down callback on gesture', () => {
      const callback = jest.fn();

      const renderTree = mount(
        <Swipe onDown={callback}>
          <h1>The content</h1>
        </Swipe>
      );

      const instance = renderTree.instance();
      instance.handleStart({ clientX: 10, clientY: 10 });
      instance.handleMove({ clientX: 10, clientY: 100 });
      instance.handleEnd();
      expect(callback.mock.calls.length).toEqual(1);
    });

    it('dont proceed without pointer information', () => {
      const callback = jest.fn();

      const renderTree = mount(
        <Swipe onDown={callback}>
          <h1>The content</h1>
        </Swipe>
      );

      const instance = renderTree.instance();
      instance.handleStart({});
      instance.handleMove({});
      instance.handleEnd({});
      expect(callback.mock.calls.length).toEqual(0);
    });

    it('handles touch gesture', () => {
      const callback = jest.fn();
      window.ontouchstart = true;

      const renderTree = mount(
        <Swipe onDown={callback}>
          <h1>The content</h1>
        </Swipe>
      );

      const instance = renderTree.instance();

      instance.handleStart({ touches: [{ clientX: 10, clientY: 10 }] });
      instance.handleMove({ touches: [{ clientX: 10, clientY: 100 }] });
      instance.handleEnd();
      expect(callback.mock.calls.length).toEqual(1);
    });
  });
});
