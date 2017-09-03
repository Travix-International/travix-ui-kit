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
      margin: '10px',
      oppositeAxisOffset: '5px',
      position: 'right',
      showCloseButton: true,
      triggerAction: 'hover',
      width: '120px',
    };

    const wrapper = mount(<Tooltip {...props} />);

    expect(wrapper.find('Tooltip').props().active).toEqual(props.active);
    expect(wrapper.find('Tooltip').props().children).toEqual(props.children);
    expect(wrapper.find('Tooltip').props().height).toEqual(props.height);
    expect(wrapper.find('Tooltip').props().margin).toEqual(props.margin);
    expect(wrapper.find('Tooltip').props().oppositeAxisOffset)
      .toEqual(props.oppositeAxisOffset);
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
      margin: '10px',
      oppositeAxisOffset: '5px',
      position: 'right',
      showCloseButton: true,
      triggerAction: 'hover',
      width: '120px',
    };

    const prototype = {
      props,
      container: {},
      countPositionOffset: jest.fn()
        .mockReturnValue({
          top: { top: -80, left: '5px' },
          bottom: { bottom: -80, left: '5px' },
          right: { right: -130, bottom: '5px' },
          left: { left: -130, bottom: '5px' },
        }),
      renderCloseButtonBlock: jest.fn()
        .mockReturnValue(<div />),
    };

    const result = Tooltip.prototype.render.call(prototype);
    const expected = { width: '120px', height: '70px', right: -130, bottom: '5px' };
    expect(result.props.style).toEqual(expected);
  });
});
