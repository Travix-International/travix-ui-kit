import React from 'react';
import { mount } from 'enzyme';
import Global from '../../../components/global/global';

describe('Global: handleClick', () => {
  it('should called stop propogation', () => {
    const wrapper = mount(
      <Global noscroll>
        Global Content
      </Global>
    );

    const event = {
      stopPropagation: jest.fn(),
    };

    wrapper.instance().handleClick(event);
    expect(event.stopPropagation).toBeCalled();
  });
});
