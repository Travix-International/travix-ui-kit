import GoogleMap from '../../../components/googleMap/googleMap';
import google from './googleApiObjectMock';

describe('GoogleMap: createCustomMarker', () => {
  it('', () => {
    const props = {
      google,
    }

    const pointData = {
      position: { lat: 52.379189, lng: 4.899431 },
      info: {
        title: 'title',
      }
    }

    const map = {};

    const CustomMarker = GoogleMap.prototype.initCustomMarkerConstructor.call({ props });
    const marker = new CustomMarker(pointData, map, 1);
    console.log(marker);
    expect(marker).toEqual({
      index: 1,
      info: pointData.info,
      latlng: pointData.position,
    });

    marker.draw();

    expect(marker).toEqual({
      index: 1,
      info: pointData.info,
      latlng: pointData.position,
    });
  });
});
