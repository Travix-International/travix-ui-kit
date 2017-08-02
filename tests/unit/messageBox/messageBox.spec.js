import * as enzyme from 'enzyme';
import * as enzymeToJson from 'enzyme-to-json';
import React from 'react';
import MessageBox from '../../../components/messageBox/messageBox';

describe('MessageBox', () => {
  describe('#render()', () => {
    const shallow = enzyme.shallow;
    const shallowToJson = enzymeToJson.shallowToJson;

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
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render success message box with title', () => {
      const wrapper = shallow(
        <MessageBox title="Success message box title" type="success">Success message box</MessageBox>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render error message box with icon', () => {
      const wrapper = shallow(
        <MessageBox icon={<div className="icon" />} type="error">Error message box</MessageBox>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
