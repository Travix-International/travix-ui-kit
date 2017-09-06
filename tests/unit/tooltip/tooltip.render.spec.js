import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson, mountToJson } from 'enzyme-to-json';
import Tooltip from '../../../components/tooltip/tooltip';

describe('Tooltip: render', () => {
  it('should render normal inactive tooltip without config', () => {
    const wrapper = shallow(<Tooltip/>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render normal active tooltip with mods', () => {
    const wrapper = shallow(<Tooltip active mods={['custom-class']} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render active tooltip with all passed props', () => {
    const props = {
      active: true,
      children: <div> Tooltip content </div>,
      height: '70px',
      axisOffsetX: '100px',
      axisOffsetY: '110px',
      position: 'right',
      showCloseButton: true,
      triggerAction: 'hover',
      width: '120px',
    };

    const wrapper = mount(<Tooltip {...props} />);

    expect(wrapper.find('Tooltip').props().active).toEqual(props.active);
    expect(wrapper.find('Tooltip').props().children).toEqual(props.children);
    expect(wrapper.find('Tooltip').props().height).toEqual(props.height);
    expect(wrapper.find('Tooltip').props().axisOffsetX).toEqual(props.axisOffsetX);
    expect(wrapper.find('Tooltip').props().axisOffsetY).toEqual(props.axisOffsetY);
    expect(wrapper.find('Tooltip').props().showCloseButton)
      .toEqual(props.showCloseButton);
    expect(wrapper.find('Tooltip').props().triggerAction).toEqual(props.triggerAction);
    expect(wrapper.find('Tooltip').props().width).toEqual(props.width);
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('should properly initialize style', () => {
    const props = {
      active: true,
      children: <div> Tooltip content </div>,
      height: '70px',
      axisOffsetX: '100px',
      axisOffsetY: '110px',
      position: 'right',
      showCloseButton: true,
      triggerAction: 'hover',
      width: '120px',
    };

    const prototype = {
      props,
      container: {},
      renderCloseButtonBlock: jest.fn()
        .mockReturnValue(<div />),
    };

    const result = Tooltip.prototype.render.call(prototype);
    const expected = { width: '120px', height: '70px', transform: 'translate(100px, 110px)' };
    expect(result.props.style).toEqual(expected);
  });
});
