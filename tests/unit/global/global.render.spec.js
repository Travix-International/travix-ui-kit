import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import Global from '../../../components/global/global';

describe('Global: render', () => {
  it('should return base active modal with close button', () => {
    const component = shallow(
      <Global>
        Global Content
      </Global>
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should return base active modal with close button', () => {
    const component = shallow(
      <Global noscroll={false}>
        Global Content
      </Global>
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
