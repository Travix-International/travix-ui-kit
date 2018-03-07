import React from 'react';
import { mount } from 'enzyme';
import Global from '../global';

describe('Global: componentWillUnmount', () => {
  it('should remove "ui-global_noscroll" className from body before unmount', () => {
    global.window.document.body.classList.remove = jest.fn();
    const wrapper = mount(
      <Global noscroll>
        Global Content
      </Global>
    );
    wrapper.instance().isSettedNoScroll = true;
    wrapper.unmount();
    expect(global.window.document.body.classList.remove).toBeCalledWith('ui-global_noscroll');
  });

  it('should not remove "ui-global_noscroll" className from body before unmount', () => {
    global.window.document.body.classList.remove = jest.fn();
    const wrapper = mount(
      <Global noscroll={false}>
        Global Content
      </Global>
    );
    wrapper.unmount();
    expect(global.window.document.body.classList.remove).not.toBeCalled();
  });
});
