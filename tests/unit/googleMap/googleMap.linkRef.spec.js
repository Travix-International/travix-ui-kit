import React from 'react';
import GoogleMap from '../../../components/googleMap/googleMap';
import google from './googleApiObjectMock';

describe('GoogleMap: linkRef', () => {
  it('should link passed ref to `this`', () => {
    const node = <div />;

    GoogleMap.prototype = {
      initCustomMarkerConstructor: jest.fn(),
    };

    const map = new GoogleMap(google);

    map.linkRef(node);

    expect(map.mapContainer).toEqual(node);
  });
});
