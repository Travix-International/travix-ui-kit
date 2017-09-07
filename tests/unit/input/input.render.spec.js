import { shallow } from 'enzyme';
import React from 'react';
import Input from '../../../components/input/input';

describe('Input', () => {
  describe('#render()', () => {
    const onChange = () => {};

    it('should render correct input', () => {
      const wrapper = shallow(
        <Input
          disabled
          name="input"
          onChange={onChange}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should not modify mods', () => {
      const mods = ['test'];
      const wrapper = shallow(
        <Input
          mods={mods}
        />
      );

      expect(mods.length).toEqual(1);
      expect(mods[0]).toEqual('test');
      expect(wrapper).toMatchSnapshot();
    });

    it('should render multiline input', () => {
      const wrapper = shallow(
        <Input
          disabled
          multiline
          name="input"
          onChange={onChange}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render span for icon', () => {
      const wrapper = shallow(
        <Input
          name="input"
          onChange={onChange}
          status="error"
        />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
