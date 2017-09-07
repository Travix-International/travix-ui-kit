import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import OverlayTrigger from '../../../components/overlayTrigger/overlayTrigger';

describe('OverlayTrigger: render', () => {
  it('should properly render component with props', () => {
    const prototype = {
      hideElement: jest.fn(),
      props: {
        children: <div className="test-child"/>,
        elemToToggle: <div className="test-toogle-element"/>,
        onElementHide: jest.fn(),
        onElementShow: jest.fn(),
        triggerAction: 'hover',
      },
    };

    const wrapper = shallow(<OverlayTrigger {...prototype.props}/>);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
