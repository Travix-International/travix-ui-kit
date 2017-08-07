import GoogleMap from '../../../components/googleMap/googleMap';
import google from './googleApiObjectMock';

describe('GoogleMap: initialize', () => {
  it('should initialize a Map and call appropriate methods for markers', () => {
    GoogleMap.prototype.createCustomMarker = jest.fn();
    GoogleMap.prototype.createMarker = jest.fn();

    const options = {
      zoom: 12,
      google,
      styles: {},
      points: [
        {
          position: { lat: 52.379189, lng: 4.899431 },
          customMarker: true,
        },
        {
          position: { lat: 52.379189, lng: 4.899431 },
          customMarker: false,
        },
      ],
    };

    GoogleMap.prototype.initialize(options);
    expect(google.maps.Map).toHaveBeenCalledTimes(1);
    expect(GoogleMap.prototype.createCustomMarker).toHaveBeenCalledTimes(1);
    expect(GoogleMap.prototype.createMarker).toHaveBeenCalledTimes(1);
  });
});
