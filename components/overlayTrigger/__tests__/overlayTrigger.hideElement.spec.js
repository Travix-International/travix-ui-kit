import { shallow } from 'enzyme';
import React from 'react';

import OverlayTrigger from '../overlayTrigger';

describe('OverlayTrigger: hideElement', () => {
  it('should set state as inactive and call the default prop onElementHide', () => {
    const props = {
      children: <div className="test-child"/>,
      elemToToggle: <div className="test-toogle-element"/>,
    };

    const wrapper = shallow(<OverlayTrigger {...props}>test</OverlayTrigger>);
    const targetElement = wrapper.find('.ui-overlay-trigger__content > div').at(0);

    wrapper.instance().showElement();
    expect(wrapper.state().active).toBe(true);

    targetElement.simulate('click');

    expect(wrapper.state().active).toBe(false);
  });

  it('should call onElementHide callback passed as prop', () => {
    const props = {
      children: <div className="test-child"/>,
      elemToToggle: <div className="test-toogle-element"/>,
      onElementHide: jest.fn(),
    };

    const wrapper = shallow(<OverlayTrigger {...props}>test</OverlayTrigger>);
    const targetElement = wrapper.find('.ui-overlay-trigger__content > div').at(0);

    wrapper.instance().showElement();
    targetElement.simulate('click');

    expect(props.onElementHide).toHaveBeenCalled();
  });
});
