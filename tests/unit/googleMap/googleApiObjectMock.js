export default {
  maps: {
    MapTypeControlStyle: {
      DEFAULT: '',
    },
    MapTypeId: {
      ROADMAP: '',
    },
    Marker: jest.fn().mockReturnValue({ addListener: jest.fn(), ab: 2 }),
    OverlayView: jest.fn(),
    Map: jest.fn(),
  },
};
