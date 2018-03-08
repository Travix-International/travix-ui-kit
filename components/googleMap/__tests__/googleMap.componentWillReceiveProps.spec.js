import GoogleMap from '../googleMap';
import google from './googleApiObjectMock';

describe('GoogleMap: componentWillReceiveProps', () => {
  it('should call initialize method if has google api object in props', () => {
    const oldProps = { width: '150px', height: '250px' };
    const newProps = { width: '150px', height: '250px', google };
    const prototype = {
      initialize: jest.fn(),
      props: oldProps,
    };

    GoogleMap.prototype.componentWillReceiveProps.call(prototype, newProps);
    expect(prototype.initialize).toHaveBeenCalledTimes(1);
    expect(prototype.initialize).toHaveBeenCalledWith(newProps);
  });

  it('should return control if there\'s no google api object in props', () => {
    const oldProps = { width: '150px', height: '250px' };
    const newProps = { width: '150px', height: '120px' };
    const prototype = {
      initialize: jest.fn(),
      props: oldProps,
    };

    GoogleMap.prototype.componentWillReceiveProps.call(prototype, newProps);
    expect(prototype.initialize).toHaveBeenCalledTimes(0);
  });
});
