import { shallow } from 'enzyme';
import React from 'react';
import Checkbox from '../../../components/checkbox/checkbox';

describe('Checkbox', () => {
  describe('#render()', () => {
    const onChange = () => {};

    it('should render disabled checkbox', () => {
      const wrapper = shallow(
        <Checkbox
          disabled
          name="disabled"
          onChange={onChange}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should not modify mods', () => {
      const mods = ['test'];
      const wrapper = shallow(
        <Checkbox
          mods={mods}
        />
      );

      expect(mods.length).toEqual(1);
      expect(mods[0]).toEqual('test');
      expect(wrapper).toMatchSnapshot();
    });

    it('should render checked checkbox', () => {
      const wrapper = shallow(
        <Checkbox
          checked
          name="checked"
          onChange={onChange}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render checkbox', () => {
      const wrapper = shallow(
        <Checkbox
          name="checkbox"
          onChange={onChange}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render checkbox with provided className', () => {
      const wrapper = shallow(
        <Checkbox className="test-class" onChange={onChange} />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
