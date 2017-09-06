import { shallow } from 'enzyme';
import React from 'react';
import google from './googleApiObjectMock';
import GoogleMap from '../../../components/googleMap/googleMap';

describe('GoogleMap: render', () => {
  it('should return base GoogleMap container', () => {
    const component = shallow(
      <GoogleMap google={google}/>
    );
    expect(component).toMatchSnapshot();
  });

  it('should return base GoogleMap container with custom size', () => {
    const component = shallow(
      <GoogleMap google={google} height="150px" width="250px" />
    );
    expect(component).toMatchSnapshot();
  });

  it('should return base GoogleMap container with custom marker', () => {
    const points = [{
      position: { lat: 52.379189, lng: 4.899431 },
      customMarker: true,
      info: {
        title: 'title',
      },
    }];

    const component = shallow(
      <GoogleMap
        google={google}
        height="150px"
        points={points}
        width="250px"
      />
    );
    expect(component).toMatchSnapshot();
  });
});
