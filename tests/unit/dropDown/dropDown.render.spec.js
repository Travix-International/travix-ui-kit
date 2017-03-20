import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import DropDown from '../../../components/dropDown/dropDown';

describe('DropDown: render', () => {
  it('should return base dropdown with required fields', () => {
    const component = shallow(
      <DropDown
        onChange={() => {}}
        options={[]}
      />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should return base dropdown with passed string value', () => {
    const component = shallow(
      <DropDown
        onChange={() => {}}
        options={[]}
        value="testValue"
      />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should return base dropdown with passed number value', () => {
    const component = shallow(
      <DropDown
        onChange={() => {}}
        options={[]}
        value={1}
      />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should return base dropdown with passed array value', () => {
    const component = shallow(
      <DropDown
        onChange={() => {}}
        options={[]}
        value={[]}
      />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should return clearable dropdown', () => {
    const component = shallow(
      <DropDown
        clearable
        onChange={() => {}}
        options={[]}
      />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should return multi dropdown', () => {
    const component = shallow(
      <DropDown
        multi
        onChange={() => {}}
        options={[]}
      />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should return dropdown with passed name', () => {
    const component = shallow(
      <DropDown
        name="testName"
        onChange={() => {}}
        options={[]}
      />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should return dropdown with shifting viewport enabled', () => {
    const component = shallow(
      <DropDown
        onChange={() => {}}
        options={[]}
        scrollMenuIntoView
      />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should return searchable dropdown', () => {
    const component = shallow(
      <DropDown
        onChange={() => {}}
        options={[]}
        searchable
      />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
