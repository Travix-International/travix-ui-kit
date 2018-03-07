function OverlayView() {
  this.setMap = jest.fn();
  this.getPanes = jest.fn().mockReturnValue({
    overlayImage: {
      appendChild: jest.fn(),
    },
  });
  this.getProjection = jest.fn(() => ({ fromLatLngToDivPixel: () => ({ x: 1, y: 3 }) }));
}

function LatLng(lat, lng) {
  this.lat = lat;
  this.lng = lng;
}

export default {
  maps: {
    MapTypeControlStyle: {
      DEFAULT: '',
    },
    MapTypeId: {
      ROADMAP: '',
    },
    Marker: function Marker() {
      this.addListener = jest.fn((event, func) => func());
    },
    OverlayView,
    LatLng,
    Map: jest.fn(),
    event: {
      addDomListener: jest.fn((event, type, func) => func()),
    },
  },
};
