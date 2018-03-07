import React from 'react';
import { mount } from 'enzyme';
import Global from '../global';

describe('Global: componentWillUnmount', () => {
  let containsStub;
  beforeEach(() => {
    containsStub = jest.fn();
  });

  it('should set isSettedNoScroll if document does not contain global noscroll class', () => {
    global.window.document.body.classList.contains = containsStub.mockReturnValue(false);
    const wrapper = mount(
      <Global noscroll>
        Global Content
      </Global>
    );
    wrapper.instance().setNoScroll();
    expect(wrapper.instance().isSettedNoScroll).toEqual(true);
  });

  it('should NOT set isSettedNoScroll if document contains global noscroll class', () => {
    global.window.document.body.classList.contains = containsStub.mockReturnValue(true);
    const wrapper = mount(
      <Global noscroll>
        Global Content
      </Global>
    );
    wrapper.instance().setNoScroll();
    expect(wrapper.instance().isSettedNoScroll).toEqual(false);
  });
});
