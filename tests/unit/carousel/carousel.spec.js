import { mount } from 'enzyme';
import React from 'react';
import Carousel from '../../../components/carousel/carousel';

describe('Carousel', () => {
  const requestAnimationFrame = global.window.requestAnimationFrame;

  beforeEach(() => {
    global.window.requestAnimationFrame = (cb) => { cb(); };
  });

  afterEach(() => {
    global.window.requestAnimationFrame = requestAnimationFrame;
  });

  describe('#render()', () => {
    it('render with default props and mods', () => {
      const images = [
        'http://lorempixel.com/600/400/city',
        'http://lorempixel.com/600/400/sports',
        'http://lorempixel.com/600/400/people',
      ];
      const renderTree = mount(
        <Carousel images={images} mods={['small']} />
      );

      const items = renderTree.find('.ui-carousel-item');

      expect(renderTree).toMatchSnapshot();
      expect(renderTree.find('.ui-carousel_small').hasClass('ui-carousel_small')).toEqual(true);
      expect(items.length).toEqual(images.length);
    });

    it('show correct pagination info', () => {
      const images = [
        'http://lorempixel.com/600/400/city',
        'http://lorempixel.com/600/400/sports',
        'http://lorempixel.com/600/400/people',
      ];
      const renderTree = mount(
        <Carousel images={images} />
      );

      const pagination = renderTree.find('.ui-carousel-page');

      expect(renderTree).toMatchSnapshot();
      expect(pagination.text()).toEqual(`1 / ${images.length}`);

      const nextButton = renderTree.find('.ui-carousel-navigation > a').last();
      nextButton.simulate('click');
      expect(pagination.text()).toEqual(`2 / ${images.length}`);
    });

    it('hitting previous move to last item', () => {
      const images = [
        'http://lorempixel.com/600/400/city',
        'http://lorempixel.com/600/400/sports',
        'http://lorempixel.com/600/400/people',
      ];
      const renderTree = mount(
        <Carousel images={images} />
      );

      expect(renderTree).toMatchSnapshot();

      const pagination = renderTree.find('.ui-carousel-page');
      const prevButton = renderTree.find('.ui-carousel-navigation > a').first();
      const nextButton = renderTree.find('.ui-carousel-navigation > a').last();
      nextButton.simulate('click');
      prevButton.simulate('click');
      prevButton.simulate('click');
      expect(pagination.text()).toEqual(`${images.length} / ${images.length}`);
    });

    it('hitting next move to first item', () => {
      const images = [
        'http://lorempixel.com/600/400/city',
        'http://lorempixel.com/600/400/sports',
        'http://lorempixel.com/600/400/people',
      ];
      const renderTree = mount(
        <Carousel images={images} />
      );

      expect(renderTree).toMatchSnapshot();

      const pagination = renderTree.find('.ui-carousel-page');
      const prevButton = renderTree.find('.ui-carousel-navigation > a').last();
      prevButton.simulate('click');
      prevButton.simulate('click');
      prevButton.simulate('click');
      expect(pagination.text()).toEqual(`1 / ${images.length}`);
    });

    it('display markers instead of pagination', () => {
      const images = [
        'http://lorempixel.com/600/400/city',
        'http://lorempixel.com/600/400/sports',
        'http://lorempixel.com/600/400/people',
      ];
      const renderTree = mount(
        <Carousel images={images} markers />
      );

      expect(renderTree).toMatchSnapshot();

      const pagination = renderTree.find('.ui-carousel-page');
      const markers = renderTree.find('.ui-carousel-markers');
      expect(pagination.exists()).toEqual(false);
      expect(markers.exists()).toEqual(true);
    });

    it('clicking markers to change pagination', () => {
      const images = [
        'http://lorempixel.com/600/400/city',
        'http://lorempixel.com/600/400/sports',
        'http://lorempixel.com/600/400/people',
      ];
      const renderTree = mount(
        <Carousel images={images} markers />
      );

      expect(renderTree).toMatchSnapshot();

      const markers = renderTree.find('.ui-carousel-markers');
      const markItem = markers.find('button').last();

      markItem.simulate('click');
      expect(renderTree.instance().state.currentItem).toEqual(images.length - 1);
    });

    it('swiping will change the current item', () => {
      const images = [
        'http://lorempixel.com/600/400/city',
        'http://lorempixel.com/600/400/sports',
        'http://lorempixel.com/600/400/people',
      ];
      const renderTree = mount(
        <Carousel images={images} markers />
      );
      expect(renderTree).toMatchSnapshot();

      const instance = renderTree.instance();

      instance.handleSwipeNext();
      expect(instance.state.currentItem).toEqual(1);

      instance.handleSwipePrev();
      expect(instance.state.currentItem).toEqual(0);
    });

    it('prevent swipe before first item', () => {
      const images = [
        'http://lorempixel.com/600/400/city',
        'http://lorempixel.com/600/400/sports',
        'http://lorempixel.com/600/400/people',
      ];
      const renderTree = mount(
        <Carousel images={images} markers />
      );
      expect(renderTree).toMatchSnapshot();

      const instance = renderTree.instance();
      instance.handleSwipePrev();

      expect(instance.state.currentItem).toEqual(0);
    });

    it('prevent swipe after last item', () => {
      const images = [
        'http://lorempixel.com/600/400/city',
        'http://lorempixel.com/600/400/sports',
        'http://lorempixel.com/600/400/people',
      ];
      const renderTree = mount(
        <Carousel images={images} markers />
      );
      expect(renderTree).toMatchSnapshot();

      const instance = renderTree.instance();

      instance.handleSwipeNext();
      instance.handleSwipeNext();
      instance.handleSwipeNext();

      expect(instance.state.currentItem).toEqual(images.length - 1);
    });
  });
});
