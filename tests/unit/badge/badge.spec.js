import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import Badge from '../../../components/badge/badge';

describe('Badge', () => {
  it('should return noscript if children and title not provided', () => {
    const wrapper = shallow(
      <Badge />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should return content inside container if title not provided', () => {
    const wrapper = shallow(
      <Badge>
        Badge Content
      </Badge>
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should return only badge if content not provided', () => {
    const wrapper = shallow(
      <Badge title="Badge title" />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should use position prop if content provided', () => {
    const wrapper = shallow(
      <Badge position="right" title="Badge title">
        Badge Content
      </Badge>
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render left arrow', () => {
    const wrapper = shallow(
      <Badge arrow position="right" title="Badge title" />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render right arrow', () => {
    const wrapper = shallow(
      <Badge arrow position="left" title="Badge title" />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
