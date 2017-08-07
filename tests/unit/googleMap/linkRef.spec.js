import GoogleMap from '../../../components/googleMap/googleMap';
import React from 'react';

describe('GoogleMap: linkRef', () => {
  it('should link passed ref to `this`', () => {
    const node = <div />;

    const map = new GoogleMap();

    map.linkRef(node);
    expect(map.mapContainer).toEqual(node);
  });
});
