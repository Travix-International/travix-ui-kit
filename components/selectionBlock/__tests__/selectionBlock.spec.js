import { shallow } from 'enzyme';
import React from 'react';
import SelectionBlock from '../selectionBlock';

describe('SelectionBlock', () => {
  describe('#render()', () => {
    it('should render base selection block', () => {
      const wrapper = shallow(
        <SelectionBlock
          subtitle="Subtitle"
          title="Title"
        >
          <div>body</div>
        </SelectionBlock>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render selection block with logo and icon', () => {
      const wrapper = shallow(
        <SelectionBlock
          icon={<span>☻</span>}
          logo={<img src="https://www.travix.com/wp-content/uploads/2015/09/travix-logo_blue.png" />}
          subtitle="Subtitle"
          title="Title"
        >
          <div>body</div>
        </SelectionBlock>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
