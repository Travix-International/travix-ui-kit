import React from 'react';
import { shallow } from 'enzyme';
import GoogleMap from '../../../components/googleMap/googleMap';

describe('GoogleMap: handleMarkerClick', () => {
  it('should call passed handler if exists', () => {
    GoogleMap.prototype.initCustomMarkerConstructor = jest.fn();
    const onMarkerClick = jest.fn();

    const index = 5;

    const component = shallow(
      <GoogleMap
        onMarkerClick={onMarkerClick}
      />
    );

    component.instance().handleMarkerClick(index);

    expect(onMarkerClick).toHaveBeenCalledTimes(1);
    expect(onMarkerClick).toHaveBeenCalledWith(index);
  });

  it('should return control if handler is not passed', () => {
    GoogleMap.prototype.initCustomMarkerConstructor = jest.fn();
    const onMarkerClick = jest.fn();

    const index = 5;

    const component = shallow(
      <GoogleMap />
    );

    component.instance().handleMarkerClick(index);

    expect(onMarkerClick).toHaveBeenCalledTimes(0);
  });
});
