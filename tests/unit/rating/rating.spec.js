import { mount } from 'enzyme';
import React from 'react';
import Rating from '../../../components/rating/rating';

describe('Rating', () => {
  describe('#render()', () => {
    it('renders with default props and mods provided', () => {
      const renderTree = mount(
        <Rating rate={0} />
      );

      const ratingElement = renderTree.find('.ui-rating');
      const valueElement = ratingElement.find('.ui-rating-value');
      const ratingStars = ratingElement.find('> b');
      const valueStars = valueElement.find('> b');

      expect(renderTree).toMatchSnapshot();
      expect(ratingStars.length).toEqual(5);
      expect(valueStars.length).toEqual(5);
      expect(valueElement.node.style.width).toEqual("0%");
    });

    it('renders with custom data attributes', () => {
      const dataAttrs = {
        'ui-test': 'rating',
      };

      const renderTree = mount(
        <Rating dataAttrs={dataAttrs} rate={0} />
      );

      expect(renderTree).toMatchSnapshot();
    });

    it('renders with custom props', () => {
      const size = 10;
      const renderTree = mount(
        <Rating rate={1.5} size={size} />
      );

      const ratingElement = renderTree.find('.ui-rating');
      const valueElement = ratingElement.find('.ui-rating-value');
      const ratingStars = ratingElement.find('> b');
      const valueStars = valueElement.find('> b');

      expect(renderTree).toMatchSnapshot();
      expect(ratingStars.length).toEqual(size);
      expect(valueStars.length).toEqual(size);
      expect(valueElement.node.style.width).toEqual("15%");
    });
  });
});
