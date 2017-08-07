import GoogleMap from '../../../components/googleMap/googleMap';
import google from './googleApiObjectMock';

describe('GoogleMap: createCustomMarker', () => {
  it('', () => {
    const props = {
      google,
    }
    GoogleMap.prototype.initCustomMarkerConstructor.call({ props });
  });
});
