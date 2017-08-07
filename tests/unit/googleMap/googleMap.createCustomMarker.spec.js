import GoogleMap from '../../../components/googleMap/googleMap';
import google from './googleApiObjectMock';

describe('GoogleMap: createCustomMarker', () => {
  it('should properly call CustomMarker constructor', () => {
    const pointData = {};
    const index = 2;
    const map = {};

    GoogleMap.prototype.CustomMarker = jest.fn();

    GoogleMap.prototype.createCustomMarker(google, pointData, index, map);
    expect(GoogleMap.prototype.CustomMarker).toHaveBeenCalledTimes(1);
    expect(GoogleMap.prototype.CustomMarker).toHaveBeenCalledWith(pointData, map, index);
  });
});
