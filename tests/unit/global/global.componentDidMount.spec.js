import React from 'react';
import { mount } from 'enzyme';
import Global from '../../../components/global/global';

describe('Global: componentDidMount', () => {
  afterEach(() => {
    global.window.document.body.classList.remove('ui-global_noscroll');
  });

  it('should add "ui-global_noscroll" className for body', () => {
    global.window.document.body.classList.add = jest.fn();
    mount(
      <Global>
        Global Content
      </Global>
    );
    expect(global.window.document.body.classList.add).toBeCalledWith('ui-global_noscroll');
  });

  it('should not add "ui-global_noscroll" className for body when prop "noscroll" is false', () => {
    global.window.document.body.classList.add = jest.fn();
    mount(
      <Global noscroll={false}>
        Global Content
      </Global>
    );
    expect(global.window.document.body.classList.add).not.toBeCalled();
  });
});
