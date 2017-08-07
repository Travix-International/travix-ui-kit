import GoogleMap from '../../../components/googleMap/googleMap';
import google from './googleApiObjectMock';

describe('GoogleMap: createMarker', () => {
  it('', () => {
    const pointData = {};
    const index = 2;
    const map = {};
    const newInfoWindow = {
      open: jest.fn(),
    };

    GoogleMap.prototype.CustomMarker = jest.fn();
    GoogleMap.prototype.props = {
      onMarkerClick: jest.fn(),
    }


    GoogleMap.prototype.createMarker(google, pointData, index, map)

    expect(google.maps.Marker).toHaveBeenCalledTimes(1);
  });
});
