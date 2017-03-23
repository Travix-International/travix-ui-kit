import { shallow } from 'enzyme';
import React from 'react';
import Collapse from '../../../components/collapse/collapse';
import CollapseItem from '../../../components/collapse/collapseItem';

describe('Collapse: componentWillReceiveProps', () => {
  it('should not set "activeKey" after receive new props when "activeKey" was not provided', () => {
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
    expect(component.props().activeKey).toEqual(undefined);
    component.setProps({ isAccordion: false });
    expect(component.props().activeKey).toEqual(undefined);
  });

  it('should change "activeKey" after receive new props when "activeKey" was provided', () => {
    const component = shallow(
      <Collapse activeKey="c1">
        <CollapseItem id="c1" title="Collapse Item 1">
          <p>Collapse content 1</p>
        </CollapseItem>
        <CollapseItem id="c2" title="Collapse Item 2">
          <p>Collapse content 2</p>
        </CollapseItem>
      </Collapse>
    );
    expect(component.state().activeKey).toEqual(['c1']);

    component.setProps({ activeKey: ['c1', 'c2'] });
    expect(component.state().activeKey).toEqual(['c1', 'c2']);

    component.setProps({ activeKey: 'c1' });
    expect(component.state().activeKey).toEqual(['c1']);
  });
});
