import { shallow } from 'enzyme';
import React from 'react';
import Global from '../../../components/global/global';

describe('Global: render', () => {
  it('should return base active modal with close button', () => {
    const component = shallow(
      <Global>
        Global Content
      </Global>
    );
    expect(component.type()).toEqual(null);
  });

  it('should return base active modal with close button', () => {
    const component = shallow(
      <Global noscroll={false}>
        Global Content
      </Global>
    );
    expect(component.type()).toEqual(null);
  });
});
