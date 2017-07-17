import * as enzyme from 'enzyme';
import * as enzymeToJson from 'enzyme-to-json';
import React from 'react';
import MessageBox from '../../../components/messageBox/messageBox';

describe('MessageBox', () => {
  describe('#render()', () => {
    const shallow = enzyme.shallow;
    const shallowToJson = enzymeToJson.shallowToJson;

    it('should render only message box', () => {
      const mods = ['test'];
      const wrapper = shallow(
        <MessageBox mods={mods}>Just a simple message box</MessageBox>
      );

      expect(mods.length).toEqual(1);
      expect(mods[0]).toEqual('test');
      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render info message box', () => {
      const wrapper = shallow(
        <MessageBox type="info">Just a info message box</MessageBox>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render error message box', () => {
      const wrapper = shallow(
        <MessageBox type="error">Ooops... this is an error!</MessageBox>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});
