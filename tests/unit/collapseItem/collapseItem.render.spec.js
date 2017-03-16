import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import CollapseItem from '../../../components/collapse/collapseItem';

describe('Collapse: render', () => {
  it('should render collapse item component', () => {
    const component = shallow(
      <CollapseItem
        id="c1"
        name="test-collapse-item"
        onChange={jest.fn()}
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
        expanded
        id="c1"
        name="test-collapse-item"
        onChange={jest.fn()}
        title="Collapse Item 1"
      >
        <div>Collapse Item content</div>
      </CollapseItem>
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render collapse item component with correct type for accordion mode', () => {
    const component = shallow(
      <CollapseItem
        accordion
        id="c1"
        name="test-collapse-item"
        onChange={jest.fn()}
        title="Collapse Item 1"
      >
        <div>Collapse Item content</div>
      </CollapseItem>
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should call onChange after click on title', () => {
    const e = { target: { checked: true } };
    const onChange = jest.fn();
    const component = shallow(
      <CollapseItem
        id="c1"
        name="test-collapse-item"
        onChange={onChange}
        title="Collapse Item 1"
      >
        <div>Collapse Item content</div>
      </CollapseItem>
    );
    component.find('.ui-collapse-item__input').simulate('change', e);
    expect(onChange).toBeCalledWith(e);
  });
});
