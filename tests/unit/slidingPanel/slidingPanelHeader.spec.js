import { mount } from 'enzyme';
import React from 'react';
import SlidingPanelHeader from '../../../components/slidingPanel/slidingPanelHeader';

jest.useFakeTimers();

describe('SlidingPanel', () => {
  describe('#render()', () => {
    it('render noscript without title', () => {
      const renderTree = mount(
        <SlidingPanelHeader />
      );

      jest.runAllTimers();

      expect(renderTree).toMatchSnapshot();
      expect(renderTree.find('noscript')).toHaveLength(1);
    });

    it('render with title', () => {
      const title = 'Test Title';
      const renderTree = mount(
        <SlidingPanelHeader title={title} />
      );

      const titleEl = renderTree.find('.ui-sliding-panel-header__title');

      jest.runAllTimers();

      expect(renderTree).toMatchSnapshot();
      expect(titleEl.text()).toEqual(title);
    });
  });
});
