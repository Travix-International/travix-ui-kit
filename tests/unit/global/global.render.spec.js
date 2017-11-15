import { mount } from 'enzyme';
import React from 'react';
import Global from '../../../components/global/global';

describe('Global: render', () => {
  it('should return base active modal with close button', () => {
    const component = mount(
      <Global>
        Global Content
      </Global>
    );

    expect(component.render().html()).toEqual(null);
  });

  it('should return base active modal with close button', () => {
    const component = mount(
      <Global noscroll={false}>
        Global Content
      </Global>
    );
    expect(component.render().html()).toEqual(null);
  });
});
