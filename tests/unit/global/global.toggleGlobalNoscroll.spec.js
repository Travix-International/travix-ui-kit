import React from 'react';
import { mount } from 'enzyme';
import Global from '../../../components/global/global';

describe('Global: componentWillUnmount', () => {
  it('should remove global noscroll class if it was setted by this instance and false flag was provided', () => {
    const addStub = jest.fn();
    const removeStub = jest.fn();
    global.window.document.body.classList.add = addStub;
    global.window.document.body.classList.remove = removeStub;
    const wrapper = mount(
      <Global noscroll>
        Global Content
      </Global>
    );
    wrapper.instance().isSettedNoScroll = true;
    wrapper.instance().toggleGlobalNoscroll(false);
    expect(addStub).toHaveBeenCalledTimes(0);
    expect(removeStub).toHaveBeenCalledTimes(1);
  });

  it('should add global noscroll class if it was setted by this instance and true flag was provided', () => {
    const addStub = jest.fn();
    const removeStub = jest.fn();
    global.window.document.body.classList.add = addStub;
    global.window.document.body.classList.remove = removeStub;
    const wrapper = mount(
      <Global noscroll>
        Global Content
      </Global>
    );
    wrapper.instance().isSettedNoScroll = true;
    wrapper.instance().toggleGlobalNoscroll(true);
    expect(addStub).toHaveBeenCalledTimes(1);
    expect(removeStub).toHaveBeenCalledTimes(0);
  });
  it('should NOT change global noscroll classes if it was NOT setted by this instance', () => {
    const addStub = jest.fn();
    const removeStub = jest.fn();
    global.window.document.body.classList.add = addStub;
    global.window.document.body.classList.remove = removeStub;
    const wrapper = mount(
      <Global noscroll>
        Global Content
      </Global>
    );
    wrapper.instance().isSettedNoScroll = false;
    wrapper.instance().toggleGlobalNoscroll(true);
    expect(addStub).toHaveBeenCalledTimes(0);
    expect(removeStub).toHaveBeenCalledTimes(0);
  });
});
