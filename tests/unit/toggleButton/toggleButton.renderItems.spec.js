import React from 'react';
import { shallow } from 'enzyme';
import ToggleButton from '../../../components/toggleButton/toggleButton';

describe('ToggleButton: renderItems', () => {
  it('should call renderItems', () => {
    const component = shallow(
      <ToggleButton
        handleSelect={() => {}}
        items={['Upper deck', 'Lower deck']}
      />
    );

    const items = component.instance().renderItems();
    expect(items.length).toEqual(2);
  }
);
});
