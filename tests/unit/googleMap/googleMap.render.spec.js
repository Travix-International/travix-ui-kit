import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import GoogleMap from '../../../components/googleMap/googleMap';

describe('GoogleMap: render', () => {
  it('should return base GoogleMap container', () => {
    const component = shallow(
      <GoogleMap />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should return base GoogleMap container with custom size', () => {
    const component = shallow(
      <GoogleMap height="150px" width="250px" />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
