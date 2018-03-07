import GoogleMap from '../googleMap';
import google from './googleApiObjectMock';

describe('GoogleMap: createMarker', () => {
  it('should create default marker', () => {
    const pointData = {
      info: {
        opened: false,
      },
    };
    const index = 2;
    const map = {};
    const newInfoWindow = {
      open: jest.fn(),
    };

    GoogleMap.prototype.CustomMarker = jest.fn();
    GoogleMap.prototype.props = {
      onMarkerClick: jest.fn(),
    };

    const marker = GoogleMap.prototype.createMarker(google, pointData, index, map, newInfoWindow);
    expect(marker.addListener).toHaveBeenCalledTimes(2);
  });

  it('should create marker with options', () => {
    const pointData = {
      info: {
        opened: false,
      },
      marker: {},
    };

    const index = 2;
    const map = {};
    const newInfoWindow = {
      open: jest.fn(),
    };

    GoogleMap.prototype.CustomMarker = jest.fn();
    GoogleMap.prototype.props = {
      onMarkerClick: jest.fn(),
    };

    const marker = GoogleMap.prototype.createMarker(google, pointData, index, map, newInfoWindow);
    expect(marker.addListener).toHaveBeenCalledTimes(2);
  });

  it('should create marker with options without opened infoWindow', () => {
    const pointData = {
      info: {
        opened: true,
      },
      marker: {},
    };

    const index = 2;
    const map = {};
    const newInfoWindow = {
      open: jest.fn(),
    };

    GoogleMap.prototype.CustomMarker = jest.fn();
    GoogleMap.prototype.props = {
      onMarkerClick: jest.fn(),
    };

    const marker = GoogleMap.prototype.createMarker(google, pointData, index, map, newInfoWindow);
    expect(marker.addListener).toHaveBeenCalledTimes(1);
  });

  it('should create marker with options without handlers', () => {
    const pointData = {
      info: {
        opened: true,
      },
      marker: {},
    };

    const index = 2;
    const map = {};
    const newInfoWindow = {
      open: jest.fn(),
    };

    GoogleMap.prototype.CustomMarker = jest.fn();
    GoogleMap.prototype.props = {};

    const marker = GoogleMap.prototype.createMarker(google, pointData, index, map, newInfoWindow);
    expect(marker.addListener).toHaveBeenCalledTimes(0);
  });
});
