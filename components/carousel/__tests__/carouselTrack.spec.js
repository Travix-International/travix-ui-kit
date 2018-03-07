import { mount } from 'enzyme';
import React from 'react';
import CarouselTrack from '../carouselTrack/carouselTrack';

let mockOnNext = jest.fn();
let mockOnPrev = jest.fn();

const mockClickEvent = (x = null, y = null) => ({
  pageX: x,
  pageY: y,
  preventDefault: jest.fn(),
});

const mockTouchEvent = (x = null, y = null) => ({
  touches: [{
    pageX: x,
    pageY: y,
  }],
  preventDefault: jest.fn(),
});

const mockBoundingClientRect = () => ({
  width: 200,
  height: 200,
});

describe('Carousel Track', () => {
  const requestAnimationFrame = global.window.requestAnimationFrame;

  beforeEach(() => {
    mockOnNext = jest.fn();
    mockOnPrev = jest.fn();
    global.window.requestAnimationFrame = (cb) => { cb(); };
  });

  afterEach(() => {
    global.window.requestAnimationFrame = requestAnimationFrame;
  });

  describe('#render()', () => {
    it('render with default props', () => {
      const renderTree = mount(
        <CarouselTrack
          onNext={mockOnNext}
          onPrev={mockOnPrev}
        />
      );
      expect(renderTree).toMatchSnapshot();
    });

    it('render with custom initial item', () => {
      const renderTree = mount(
        <CarouselTrack
          current={2}
          onNext={mockOnNext}
          onPrev={mockOnPrev}
        />
      );

      const instance = renderTree.instance();
      expect(renderTree).toMatchSnapshot();
      expect(instance.$elm.style.transform).toEqual('translateX(-200%)');
    });

    it('changing custom initial item to same dont change position', () => {
      const renderTree = mount(
        <CarouselTrack
          current={2}
          onNext={mockOnNext}
          onPrev={mockOnPrev}
        />
      );
      renderTree.setProps({ current: 2 });
      const instance = renderTree.instance();
      expect(renderTree).toMatchSnapshot();
      expect(instance.$elm.style.transform).toEqual('translateX(-200%)');
    });

    it('changing current will move element', () => {
      const renderTree = mount(
        <CarouselTrack
          current={2}
          onNext={mockOnNext}
          onPrev={mockOnPrev}
        />
      );

      const instance = renderTree.instance();
      instance.$elm.getBoundingClientRect = mockBoundingClientRect;
      renderTree.setProps({ current: 3 });
      expect(renderTree).toMatchSnapshot();
      expect(instance.$elm.style.transform).toEqual('translateX(-600px)');
    });

    it('changing touchable behavior', () => {
      const renderTree = mount(
        <CarouselTrack
          onNext={mockOnNext}
          onPrev={mockOnPrev}
        />
      );

      const instance = renderTree.instance();

      const ctx = {
        bindEvents: jest.fn(),
        unbindEvents: jest.fn(),
        resetSlidePosition: jest.fn(),
        props: {
          touchable: false,
        },
      };

      instance.componentWillReceiveProps.call(ctx, { touchable: true });

      expect(ctx.bindEvents).toHaveBeenCalledTimes(1);
      expect(ctx.unbindEvents).toHaveBeenCalledTimes(0);

      ctx.props.touchable = true;

      instance.componentWillReceiveProps.call(ctx, { touchable: false });

      expect(ctx.bindEvents).toHaveBeenCalledTimes(1);
      expect(ctx.unbindEvents).toHaveBeenCalledTimes(1);
    });

    it('small move wont fire prev event', () => {
      const renderTree = mount(
        <CarouselTrack
          onNext={mockOnNext}
          onPrev={mockOnPrev}
        />
      );

      const instance = renderTree.instance();
      instance.$elm.getBoundingClientRect = mockBoundingClientRect;

      instance.componentDidMount();
      instance.handleStart(mockClickEvent(10, 10));
      instance.handleMove(mockClickEvent(20, 10));
      instance.handleEnd();

      expect(renderTree).toMatchSnapshot();
      expect(mockOnPrev.mock.calls.length).toEqual(0);
    });

    it('moving to right will fire prev event', () => {
      const renderTree = mount(
        <CarouselTrack
          onNext={mockOnNext}
          onPrev={mockOnPrev}
        />
      );

      const instance = renderTree.instance();
      instance.$elm.getBoundingClientRect = mockBoundingClientRect;

      instance.componentDidMount();
      instance.handleStart(mockClickEvent(10, 10));
      instance.handleMove(mockClickEvent(100, 10));
      instance.handleEnd();

      expect(renderTree).toMatchSnapshot();
      expect(mockOnPrev.mock.calls.length).toEqual(1);
    });

    it('moving to left will fire next event', () => {
      const renderTree = mount(
        <CarouselTrack
          onNext={mockOnNext}
          onPrev={mockOnPrev}
        />
      );

      const instance = renderTree.instance();
      instance.$elm.getBoundingClientRect = mockBoundingClientRect;

      instance.componentDidMount();
      instance.handleStart(mockClickEvent(100, 10));
      instance.handleMove(mockClickEvent(10, 10));
      instance.handleEnd();

      expect(renderTree).toMatchSnapshot();
      expect(mockOnNext.mock.calls.length).toEqual(1);
    });

    it('handle touch events event', () => {
      window.ontouchstart = true;
      const renderTree = mount(
        <CarouselTrack
          onNext={mockOnNext}
          onPrev={mockOnPrev}
        />
      );

      const instance = renderTree.instance();
      instance.$elm.getBoundingClientRect = mockBoundingClientRect;

      instance.componentDidMount();
      instance.handleStart(mockTouchEvent(10, 10));
      instance.handleMove(mockTouchEvent(100, 10));
      instance.handleEnd();
      instance.componentWillUnmount();

      expect(renderTree).toMatchSnapshot();
      expect(mockOnPrev.mock.calls.length).toEqual(1);
    });

    it('wont move element if touch didnt start', () => {
      window.ontouchstart = true;
      const renderTree = mount(
        <CarouselTrack
          onNext={mockOnNext}
          onPrev={mockOnPrev}
        />
      );

      const instance = renderTree.instance();
      instance.$elm.getBoundingClientRect = mockBoundingClientRect;

      instance.componentDidMount();
      instance.handleMove(mockClickEvent(100, 10));
      instance.handleEnd();

      expect(renderTree).toMatchSnapshot();
      expect(mockOnPrev.mock.calls.length).toEqual(0);
    });
  });
});
