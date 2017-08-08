import GoogleMap from '../../../components/googleMap/googleMap';
import google from './googleApiObjectMock';

let ctx;

describe('GoogleMap: initCustomMarkerConstructor', () => {
  beforeEach(() => {
    ctx = {
      props: {
        google,
      },
      handleMarkerClick: () => {},
    };
  });

  it('should create custom marker instance with corren data', () => {
    const pointData = {
      position: { lat: 52.379189, lng: 4.899431 },
      info: {
        title: 'title',
      },
    };

    const CustomMarker = GoogleMap.prototype.initCustomMarkerConstructor.call(ctx);
    const marker = new CustomMarker(pointData, {}, 1);

    expect(marker).toEqual({
      index: 1,
      info: pointData.info,
      latlng: pointData.position,
    });

    marker.draw();

    expect(marker.div instanceof HTMLElement).toEqual(true);
    expect(marker.div.style.left).toEqual('1px');
    expect(marker.div.style.top).toEqual('3px');
  });

  it('should not create title if info.title not exist', () => {
    const pointData = {
      position: { lat: 52.379189, lng: 4.899431 },
      info: {
        content: document.createElement('DIV'),
      },
    };

    const CustomMarker = GoogleMap.prototype.initCustomMarkerConstructor.call(ctx);
    const marker = new CustomMarker(pointData, {}, 3);
    marker.draw();

    expect(marker.info.title).toEqual(undefined);
    expect(marker.info.content instanceof HTMLElement).toEqual(true);
  });

  it('should add html content if content is exist', () => {
    const pointData = {
      position: { lat: 52.379189, lng: 4.899431 },
      info: {
        content: document.createElement('DIV'),
      },
    };

    const CustomMarker = GoogleMap.prototype.initCustomMarkerConstructor.call(ctx);
    CustomMarker.prototype.div = document.createElement('DIV');
    const marker = new CustomMarker(pointData, {}, 3);
    marker.draw();

    expect(marker.info.title).toEqual(undefined);
    expect(marker.info.content instanceof HTMLElement).toEqual(true);
  });

  it('should not add offset if point info not exist', () => {
    const pointData = {
      position: { lat: 52.379189, lng: 4.899431 },
      info: {
        content: document.createElement('DIV'),
      },
    };

    const CustomMarker = GoogleMap.prototype.initCustomMarkerConstructor.call(ctx);
    CustomMarker.prototype.getProjection = jest.fn(() => ({ fromLatLngToDivPixel: () => {} }));
    const marker = new CustomMarker(pointData, {}, 3);
    marker.draw();

    expect(marker.div.style.left).toEqual('');
    expect(marker.div.style.top).toEqual('');
  });
});
