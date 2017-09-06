import React from 'react';
import { shallow } from 'enzyme';
import ToggleButton from '../../../components/toggleButton/toggleButton';

describe('ToggleButton: handleSelectItem', () => {
  it('should call setState with correct data', () => {
    ToggleButton.prototype.setState = jest.fn();
    const handleSelect = jest.fn();
    const e = {
      stopPropagation: jest.fn(),
      target: { textContent: 'Lower deck' },
    };

    const component = shallow(
      <ToggleButton
        handleSelect={handleSelect}
        items={['Upper deck', 'Lower deck']}
      />
    );

    component.instance().setState({ activeItem: 0 });
    component.instance().handleSelectItem(e);

    expect(e.stopPropagation).toBeCalled();
    expect(component.instance().setState).toBeCalled();
  });

  it('should call handler when correct data', () => {
    const handleSelect = jest.fn();
    const e = {
      stopPropagation: jest.fn(),
      target: { textContent: 'Lower deck' },
    };

    const component = shallow(
      <ToggleButton
        handleSelect={handleSelect}
        items={['Upper deck', 'Lower deck']}
      />, { lifecycleExperimental: true }
    );

    component.instance().handleSelectItem(e);

    expect(handleSelect).toBeCalled();
  });
});
