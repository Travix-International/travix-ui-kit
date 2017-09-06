import { shallow } from 'enzyme';
import React from 'react';
import Collapse from '../../../components/collapse/collapse';
import CollapseItem from '../../../components/collapse/collapseItem';

describe('Collapse: render', () => {
  it('should return empty collapse component', () => {
    const component = shallow(
      <Collapse />
    );
    expect(component).toMatchSnapshot();
  });

  it('should return collapse component with two items', () => {
    const component = shallow(
      <Collapse>
        <CollapseItem title="Collapse Item 1">
          <p>Collapse content 1</p>
        </CollapseItem>
        <CollapseItem title="Collapse Item 2">
          <p>Collapse content 2</p>
        </CollapseItem>
      </Collapse>
    );
    expect(component).toMatchSnapshot();
  });

  it('should return "accordion" collapse component with two items', () => {
    const component = shallow(
      <Collapse isAccordion>
        <CollapseItem title="Collapse Item 1">
          <p>Collapse content 1</p>
        </CollapseItem>
        <CollapseItem title="Collapse Item 2">
          <p>Collapse content 2</p>
        </CollapseItem>
      </Collapse>
    );
    expect(component).toMatchSnapshot();
  });

  it('should not render collapse component child if it is not valid react element', () => {
    const component = shallow(
      <Collapse isAccordion>
        {null}
        {false}
        {"test"}
      </Collapse>
    );
    expect(component).toMatchSnapshot();
  });

  it('should render collapse component items with custom id', () => {
    const component = shallow(
      <Collapse isAccordion>
        <CollapseItem id="сid1" title="Collapse Item 1">
          <p>Collapse content 1</p>
        </CollapseItem>
        <CollapseItem id="сid2" title="Collapse Item 2">
          <p>Collapse content 2</p>
        </CollapseItem>
      </Collapse>
    );
    expect(component).toMatchSnapshot();
  });

  it('should render collapse component items and first item should be expanded', () => {
    const component = shallow(
      <Collapse activeKey="сid1" isAccordion>
        <CollapseItem id="сid1" title="Collapse Item 1">
          <p>Collapse content 1</p>
        </CollapseItem>
        <CollapseItem id="сid2" title="Collapse Item 2">
          <p>Collapse content 2</p>
        </CollapseItem>
      </Collapse>
    );
    expect(component).toMatchSnapshot();
  });

  it('should render collapse component with expanded item by default', () => {
    const component = shallow(
      <Collapse defaultActiveKey="сid2" isAccordion>
        <CollapseItem id="сid1" title="Collapse Item 1">
          <p>Collapse content 1</p>
        </CollapseItem>
        <CollapseItem id="сid2" title="Collapse Item 2">
          <p>Collapse content 2</p>
        </CollapseItem>
      </Collapse>
    );
    expect(component).toMatchSnapshot();
  });

  it('should render collapse component with expanded item based on props when "defaultActiveKey" is provided', () => {
    const component = shallow(
      <Collapse activeKey="сid1" defaultActiveKey="сid2" isAccordion>
        <CollapseItem id="сid1" title="Collapse Item 1">
          <p>Collapse content 1</p>
        </CollapseItem>
        <CollapseItem id="сid2" title="Collapse Item 2">
          <p>Collapse content 2</p>
        </CollapseItem>
      </Collapse>
    );
    expect(component).toMatchSnapshot();
  });

  it('should render collapse component with expanded items based on "defaultActiveKey"', () => {
    const component = shallow(
      <Collapse defaultActiveKey={['сid1', 'сid2']}>
        <CollapseItem id="сid1" title="Collapse Item 1">
          <p>Collapse content 1</p>
        </CollapseItem>
        <CollapseItem id="сid2" title="Collapse Item 2">
          <p>Collapse content 2</p>
        </CollapseItem>
      </Collapse>
    );
    expect(component).toMatchSnapshot();
  });

  it('should render collapse component with icon on the right', () => {
    const component = shallow(
      <Collapse defaultActiveKey={['сid1', 'сid2']} iconPosition="right">
        <CollapseItem id="сid1" title="Collapse Item 1">
          <p>Collapse content 1</p>
        </CollapseItem>
        <CollapseItem id="сid2" title="Collapse Item 2">
          <p>Collapse content 2</p>
        </CollapseItem>
      </Collapse>
    );
    expect(component).toMatchSnapshot();
  });

  it('should render collapse with mod', () => {
    const component = shallow(
      <Collapse mods={['collapse-mod']}>
        <CollapseItem title="Collapse Item 1">
          <p>Collapse content 1</p>
        </CollapseItem>
        <CollapseItem title="Collapse Item 2">
          <p>Collapse content 2</p>
        </CollapseItem>
      </Collapse>
    );
    expect(component).toMatchSnapshot();
  });
});
