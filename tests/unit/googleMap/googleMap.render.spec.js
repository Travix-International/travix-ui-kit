import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import google from './googleApiObjectMock';
import GoogleMap from '../../../components/googleMap/googleMap';

describe('GoogleMap: render', () => {
  it('should return base GoogleMap container', () => {
    const component = shallow(
      <GoogleMap google={google}/>
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should return base GoogleMap container with custom size', () => {
    const component = shallow(
      <GoogleMap google={google} height="150px" width="250px" />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
