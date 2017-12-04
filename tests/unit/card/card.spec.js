import { shallow } from 'enzyme';
import React from 'react';
import Card from '../../../components/card/card';

describe('Card', () => {
  it('should return content inside Card container with default props', () => {
    const wrapper = shallow(
      <Card>
        Card Content
      </Card>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should return content inside Card container with checked state', () => {
    const wrapper = shallow(
      <Card checked>
        Card Content
      </Card>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should return content inside Card container with transparent state', () => {
    const wrapper = shallow(
      <Card transparent>
        Card Content
      </Card>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should return content inside Card container with checked and transparent state', () => {
    const wrapper = shallow(
      <Card checked transparent>
        Card Content
      </Card>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should return content inside Card container with hovering state', () => {
    const wrapper = shallow(
      <Card hovering>
        Card Content
      </Card>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should return content inside Card container with transparent and hovering state', () => {
    const wrapper = shallow(
      <Card hovering transparent>
        Card Content
      </Card>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should return content inside Card container with icon', () => {
    const wrapper = shallow(
      <Card checked showIcon>
        Card Content
      </Card>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
