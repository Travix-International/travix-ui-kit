import { mount, shallow } from 'enzyme';
import React from 'react';
import DropDown from '../../../components/dropDown/dropDown';

describe('DropDown: render', () => {
  it('should return base dropdown with required fields', () => {
    const component = mount(
      <DropDown
        onChange={() => {}}
        options={[]}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should return base dropdown with passed string value', () => {
    const component = mount(
      <DropDown
        onChange={() => {}}
        options={[]}
        value="testValue"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should return base dropdown with passed number value', () => {
    const component = mount(
      <DropDown
        onChange={() => {}}
        options={[]}
        value={1}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should return base dropdown with passed array value', () => {
    const component = mount(
      <DropDown
        onChange={() => {}}
        options={[]}
        value={[]}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should return clearable dropdown', () => {
    const component = mount(
      <DropDown
        clearable
        onChange={() => {}}
        options={[]}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should return multi dropdown', () => {
    const component = mount(
      <DropDown
        multi
        onChange={() => {}}
        options={[]}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should return dropdown with passed name', () => {
    const component = mount(
      <DropDown
        name="testName"
        onChange={() => {}}
        options={[]}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should return dropdown with shifting viewport enabled', () => {
    const component = mount(
      <DropDown
        onChange={() => {}}
        options={[]}
        scrollMenuIntoView
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should return searchable dropdown', () => {
    const component = mount(
      <DropDown
        onChange={() => {}}
        options={[]}
        searchable
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should return filter dropdown', () => {
    const component = mount(
      <DropDown
        filterMode
        onChange={() => {}}
        options={[{ checked: true }]}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should return dropdown with status', () => {
    const component = mount(
      <DropDown
        onChange={() => {}}
        options={[]}
        status="error"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should return dropdown with icon', () => {
    const component = mount(
      <DropDown
        icon="iconClass"
        onChange={() => {}}
        options={[{ checked: true, label: 'One', value: 'one' }, { checked: false, label: 'Two', value: 'two' }]}
      />
    );

    component
      .find('.Select-arrow')
      .at(0)
      .simulate('mousedown', {});

    expect(component).toMatchSnapshot();
  });
});
