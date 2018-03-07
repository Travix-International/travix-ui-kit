import React from 'react';
import { shallow } from 'enzyme';
import Collapse from '../collapse';
import CollapseItem from '../collapseItem/collapseItem';

describe('Collapse: handleItemClick', () => {
  it('should toggle "CollapseItem" when "Collapse" is accordion', () => {
    const e = { target: {} };
    const component = shallow(
      <Collapse isAccordion>
        <CollapseItem id="c1" title="Collapse Item 1">
          <p>Collapse content 1</p>
        </CollapseItem>
        <CollapseItem id="c2" title="Collapse Item 2">
          <p>Collapse content 2</p>
        </CollapseItem>
      </Collapse>
    );

    component.instance().handleItemClick(e, 'c1');
    expect(component.state().activeKey).toEqual(['c1']);

    component.instance().handleItemClick(e, 'c1');
    expect(component.state().activeKey).toEqual([]);
  });

  it('should expand only one "CollapseItem" when "Collapse" is accordion', () => {
    const e = { target: {} };
    const component = shallow(
      <Collapse isAccordion>
        <CollapseItem id="c1" title="Collapse Item 1">
          <p>Collapse content 1</p>
        </CollapseItem>
        <CollapseItem id="c2" title="Collapse Item 2">
          <p>Collapse content 2</p>
        </CollapseItem>
      </Collapse>
    );

    component.instance().handleItemClick(e, 'c1');
    expect(component.state().activeKey).toEqual(['c1']);

    component.instance().handleItemClick(e, 'c2');
    expect(component.state().activeKey).toEqual(['c2']);
  });

  it('should collapse one "CollapseItem" when "Collapse" is accordion', () => {
    const e = { target: {} };
    const onChange = jest.fn();
    const component = shallow(
      <Collapse activeKey="c1" isAccordion onChange={onChange}>
        <CollapseItem id="c1" title="Collapse Item 1">
          <p>Collapse content 1</p>
        </CollapseItem>
        <CollapseItem id="c2" title="Collapse Item 2">
          <p>Collapse content 2</p>
        </CollapseItem>
      </Collapse>
    );

    component.instance().handleItemClick(e, 'c1');
    expect(onChange.mock.calls[0][0]).toEqual(undefined);
  });

  it('should expand more then one "CollapseItem" when "Collapse" is not accordion', () => {
    const e = { target: {} };
    const component = shallow(
      <Collapse>
        <CollapseItem id="c1" title="Collapse Item 1">
          <p>Collapse content 1</p>
        </CollapseItem>
        <CollapseItem id="c2" title="Collapse Item 2">
          <p>Collapse content 2</p>
        </CollapseItem>
      </Collapse>
    );

    expect(component.state().activeKey).toEqual([]);

    component.instance().handleItemClick(e, 'c1');
    expect(component.state().activeKey).toEqual(['c1']);

    component.instance().handleItemClick(e, 'c2');
    expect(component.state().activeKey).toEqual(['c1', 'c2']);
  });

  it('should collapse one by one "CollapseItem" when "Collapse" is not accordion', () => {
    const e = { target: {} };
    const onChange = jest.fn();
    const component = shallow(
      <Collapse activeKey={['c1', 'c2']} onChange={onChange}>
        <CollapseItem id="c1" title="Collapse Item 1">
          <p>Collapse content 1</p>
        </CollapseItem>
        <CollapseItem id="c2" title="Collapse Item 2">
          <p>Collapse content 2</p>
        </CollapseItem>
      </Collapse>
    );

    component.instance().handleItemClick(e, 'c2');
    expect(onChange.mock.calls[0][0]).toEqual(['c1']);
  });

  it('should collapse one by one "CollapseItem" when "Collapse" is not accordion', () => {
    const e = { target: {} };
    const onChange = jest.fn();
    const component = shallow(
      <Collapse onChange={onChange}>
        <CollapseItem id="c1" title="Collapse Item 1">
          <p>Collapse content 1</p>
        </CollapseItem>
        <CollapseItem id="c2" title="Collapse Item 2">
          <p>Collapse content 2</p>
        </CollapseItem>
      </Collapse>
    );

    component.instance().handleItemClick(e, 'c2');
    expect(component.state().activeKey).toEqual(['c2']);

    component.instance().handleItemClick(e, 'c1');
    expect(component.state().activeKey).toEqual(['c2', 'c1']);

    component.instance().handleItemClick(e, 'c2');
    expect(component.state().activeKey).toEqual(['c1']);
  });
});
