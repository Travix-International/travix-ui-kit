import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import CollapseItem from '../../../components/collapse/collapseItem';

describe('Collapse: render', () => {
  it('should render collapse item component', () => {
    const component = shallow(
      <CollapseItem
        id="c1"
        title="Collapse Item 1"
      >
        <div>Collapse Item content</div>
      </CollapseItem>
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render expanded collapse item component', () => {
    const component = shallow(
      <CollapseItem
        id="c1"
        isActive
        title="Collapse Item 1"
      >
        <div>Collapse Item content</div>
      </CollapseItem>
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render collapse item without id', () => {
    const component = shallow(
      <CollapseItem title="Collapse Item 1">
        <div>Collapse Item content</div>
      </CollapseItem>
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should call onClick after click on label with correct id', () => {
    const e = { target: {} };
    const onClick = jest.fn();
    const component = shallow(
      <CollapseItem
        id="c1"
        onClick={onClick}
        title="Collapse Item 1"
      >
        <div>Collapse Item content</div>
      </CollapseItem>
    );
    component.find('.ui-collapse__label').simulate('click', e);
    expect(onClick).toBeCalledWith(e, 'c1');
  });

  it('should work fine after click on label when "onClick" function is not provided', () => {
    const e = { target: {} };
    const component = shallow(
      <CollapseItem
        id="c1"
        title="Collapse Item 1"
      >
        <div>Collapse Item content</div>
      </CollapseItem>
    );
    component.find('.ui-collapse__label').simulate('click', e);
  });

  it('should render collapseItem component with icon on the right', () => {
    const component = shallow(
      <CollapseItem iconPosition="right" title="Collapse Item 1">
        <div>Collapse Item content</div>
      </CollapseItem>
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
