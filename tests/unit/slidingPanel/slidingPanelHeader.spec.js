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

    it('render with custom left and right blocks', () => {
      const title = 'Test Title';
      const renderTree = mount(
        <SlidingPanelHeader
          leftBlock={<button data-rel="close" style={{ marginLeft: '15px' }}> ← </button>}
          rightBlock={<button data-rel="close" style={{ marginRight: '15px' }}> close me! </button>}
          title={title}
        />
      );

      const titleEl = renderTree.find('.ui-sliding-panel-header__title');

      jest.runAllTimers();

      expect(renderTree).toMatchSnapshot();
      expect(titleEl.text()).toEqual(title);
    });

    it('render with title as a node', () => {
      const title = <span className="my-class"> my label </span>;
      const renderTree = mount(
        <SlidingPanelHeader
          leftBlock={<button data-rel="close" style={{ marginLeft: '15px' }}> ← </button>}
          rightBlock={<button data-rel="close" style={{ marginRight: '15px' }}> close me! </button>}
          title={title}
        />
      );

      const titleEl = renderTree.find('.ui-sliding-panel-header__title');
      const titleContent = renderTree.find('.my-class');

      jest.runAllTimers();

      expect(titleEl).toHaveLength(1);
      expect(titleContent).toHaveLength(1);
    });
  });
});
