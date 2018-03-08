import { shallow } from 'enzyme';
import React from 'react';
import MessageBox from '../messageBox';

describe('MessageBox', () => {
  describe('#render()', () => {
    it('should render info message box with test modifications', () => {
      const mods = ['test'];
      const dataAttr = {
        gtmId: 'info-message',
        e2e: 'ui-messageBox',
      };
      const wrapper = shallow(
        <MessageBox dataAttr={dataAttr} mods={mods}>Just a simple message box</MessageBox>
      );

      expect(mods.length).toEqual(1);
      expect(mods[0]).toEqual('test');
      expect(wrapper).toMatchSnapshot();
    });

    it('should render success message box with title', () => {
      const wrapper = shallow(
        <MessageBox title="Success message box title" type="success">Success message box</MessageBox>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render error message box with icon', () => {
      const wrapper = shallow(
        <MessageBox icon={<div className="icon" />} type="error">Error message box</MessageBox>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render message box with provided className', () => {
      const wrapper = shallow(
        <MessageBox className={"test-cls"}>Message box</MessageBox>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
