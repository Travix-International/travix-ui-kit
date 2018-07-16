import { shallow } from 'enzyme';
import React from 'react';
import Badge from '../../../components/badge/badge';

describe('Badge', () => {
  it('should return noscript if children and title not provided', () => {
    const wrapper = shallow(
      <Badge />
    );

    expect(wrapper.html()).toEqual(null);
  });

  it('should return content inside container if title not provided', () => {
    const wrapper = shallow(
      <Badge>
        Badge Content
      </Badge>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should return only badge if content not provided', () => {
    const wrapper = shallow(
      <Badge title="Badge title" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should use position prop if content provided', () => {
    const wrapper = shallow(
      <Badge position="right" title="Badge title">
        Badge Content
      </Badge>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render content without badge when badge is not visible', () => {
    const wrapper = shallow(
      <Badge position="right" title="Badge title" visible={false}>
        Badge Content
      </Badge>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render left arrow', () => {
    const wrapper = shallow(
      <Badge arrow position="right" title="Badge title" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render right arrow', () => {
    const wrapper = shallow(
      <Badge arrow position="left" title="Badge title" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render badge without border', () => {
    const wrapper = shallow(
      <Badge border={false} title="Badge title" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render badge with provided className', () => {
    const wrapper = shallow(
      <Badge className="test-class" title="Badge title" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render badge with provided dataAttrs', () => {
    const wrapper = shallow(
      <Badge dataAttrs={{ 'test-data-attr': 'test' }} title="Badge title" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render badge with "start" alignment', () => {
    const wrapper = shallow(
      <Badge align="start" title="Badge title" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render badge with "center" alignment', () => {
    const wrapper = shallow(
      <Badge align="center" title="Badge title" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render badge with "end" alignment', () => {
    const wrapper = shallow(
      <Badge align="end" title="Badge title" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render badge with "start" alignment by default for "top" position', () => {
    const wrapper = shallow(
      <Badge position="top" title="Badge title" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render badge with "end" alignment by default for "bottom" position', () => {
    const wrapper = shallow(
      <Badge position="bottom" title="Badge title" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render badge with both are position and alignment passed', () => {
    const wrapper = shallow(
      <Badge align="center" position="top" title="Badge title" />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render badge with main container class name', () => {
    const wrapper = shallow(
      <Badge containerClassName="my-container-class" title="Badge title">
        <p>Children element</p>
      </Badge>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
