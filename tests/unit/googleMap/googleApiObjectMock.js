function OverlayView() {
  this.setMap = jest.fn();
  this.getPanes = jest.fn().mockReturnValue({
    overlayImage: {
      appendChild: jest.fn(),
    },
  });
  this.getProjection = jest.fn().mockReturnValue({});
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
    Marker: jest.fn().mockReturnValue({ addListener: jest.fn(), ab: 2 }),
    OverlayView: OverlayView,
    LatLng: LatLng,
    Map: jest.fn(),
    event: {
      addDomListener: jest.fn(),
    },
  },
};
