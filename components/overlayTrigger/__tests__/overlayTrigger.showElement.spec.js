import { shallow } from 'enzyme';
import React from 'react';

import OverlayTrigger from '../overlayTrigger';

describe('OverlayTrigger: showElement', () => {
  it('should set state as active and call the default prop onElementShow', () => {
    const props = {
      children: <div className="test-child"/>,
      elemToToggle: <div className="test-toogle-element"/>,
    };

    const wrapper = shallow(<OverlayTrigger {...props}>test</OverlayTrigger>);
    const targetElement = wrapper.find('.ui-overlay-trigger__content > div').at(0);

    expect(wrapper.state().active).toBe(false);

    targetElement.simulate('click');

    expect(wrapper.state().active).toBe(true);
  });

  it('should call onElementShow callback passed as prop', () => {
    const props = {
      children: <div className="test-child"/>,
      elemToToggle: <div className="test-toogle-element"/>,
      onElementShow: jest.fn(),
    };

    const wrapper = shallow(<OverlayTrigger {...props}>test</OverlayTrigger>);
    const targetElement = wrapper.find('.ui-overlay-trigger__content > div').at(0);

    targetElement.simulate('click');

    expect(props.onElementShow).toHaveBeenCalled();
  });
});
