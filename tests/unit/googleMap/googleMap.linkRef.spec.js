import React from 'react';
import GoogleMap from '../../../components/googleMap/googleMap';

describe('GoogleMap: linkRef', () => {
  it('should link passed ref to `this`', () => {
    const node = <div />;

    GoogleMap.prototype = {
      initCustomMarkerConstructor: jest.fn(),
    };

    const map = new GoogleMap();

    map.linkRef(node);

    expect(map.mapContainer).toEqual(node);
  });
});
