import GoogleMap from '../../../components/googleMap/googleMap';

describe('GoogleMap: componentDidMount', () => {
  it('should call initialize method with current props', () => {
    const props = { width: '150px', height: '250px' };
    const prototype = {
      initialize: jest.fn(),
      props,
    };

    GoogleMap.prototype.componentDidMount.call(prototype, props);

    expect(prototype.initialize).toHaveBeenCalledTimes(1);
    expect(prototype.initialize).toHaveBeenCalledWith(props);
  });
});
