import { shallow, mount } from 'enzyme';
import React from 'react';
import Tabs from '../../../components/tabs/tabs';
import Tab from '../../../components/tabs/tab';

describe('Tabs', () => {
  describe('#render()', () => {
    const onChange = () => {};

    it('should render correct component with basic data', () => {
      const wrapper = shallow(
        <Tabs name="tabs1" onChange={onChange}>
          <Tab title="One" />
          <Tab title="Two" />
        </Tabs>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should change "activeTab" after receive new props when "activeTab" was provided', () => {
      const wrapper = shallow(
        <Tabs name="tabs1" onChange={onChange}>
          <Tab title="One" />
          <Tab title="Two" />
        </Tabs>
      );

      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ activeTab: '1' });
      expect(wrapper).toMatchSnapshot();

      wrapper.setProps({ activeTab: '1' });
      expect(wrapper).toMatchSnapshot();
    });

    it('should not render correct with other tags', () => {
      const wrapper = shallow(
        <Tabs name="tabs1" onChange={onChange}>
          <div>test</div>
        </Tabs>
      );

      expect(wrapper.type()).toEqual(null);
    });

    it('should render correct data with content', () => {
      const wrapper = shallow(
        <Tabs name="tabs1" onChange={onChange}>
          <Tab title="One">text</Tab>
        </Tabs>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render correct data with custome values', () => {
      const wrapper = shallow(
        <Tabs name="tabs1" onChange={onChange}>
          <Tab title="One" value="1">text</Tab>
        </Tabs>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render correct data with init value', () => {
      const wrapper = shallow(
        <Tabs activeTab="1" name="tabs1" onChange={onChange}>
          <Tab title="One" value="1">text</Tab>
        </Tabs>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should call onChange method', () => {
      const renderTree = mount(
        <Tabs activeTab="1" name="tabs1" onChange={onChange}>
          <Tab title="One" value="1">text</Tab>
        </Tabs>
      );

      const tab = renderTree.find('.ui-tab');
      tab.simulate('click');

      expect(renderTree).toMatchSnapshot();
    });

    it('should call onClick method', () => {
      const renderTree = mount(
        <Tabs activeTab="1" name="tabs1">
          <Tab onClick={onChange} title="One" value="1">text</Tab>
        </Tabs>
      );

      const tab = renderTree.find('.ui-tab');
      tab.simulate('click');

      expect(renderTree).toMatchSnapshot();
    });

    it('should not call onClick method', () => {
      const renderTree = mount(<Tab title="One" value="1">text</Tab>);

      const tab = renderTree.find('.ui-tab');
      tab.simulate('click');

      expect(renderTree).toMatchSnapshot();
    });

    it('should render with custom tab content', () => {
      const wrapper = shallow(<Tab title={(<div>abc</div>)} value="1">text</Tab>);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
