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
      return this;
    },
    OverlayView: jest.fn(),
    Map: jest.fn(),
  },
};
