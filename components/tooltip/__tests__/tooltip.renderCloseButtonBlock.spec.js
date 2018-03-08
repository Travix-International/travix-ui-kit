import { mount } from 'enzyme';
import Tooltip from '../tooltip';

describe('Tooltip: renderCloseButtonBlock', () => {
  it('should render close button block with proper config', () => {
    const prototype = {
      props: {
        onCloseButtonClick: () => {},
        showCloseButton: true,
        triggerAction: 'click',
      },
    };

    const result = Tooltip.prototype.renderCloseButtonBlock.call(prototype);

    const component = mount(result);
    const buttonSection = component.find('.ui-tooltip__close-button-section');
    const button = component.find('.ui-tooltip__close-button');

    expect(buttonSection.length).toEqual(1);
    expect(button.length).toEqual(1);
  });

  it('should return null if triggerAction is not click', () => {
    const prototype = {
      props: {
        onCloseButtonClick: () => {},
        showCloseButton: true,
        triggerAction: 'hover',
      },
    };

    const result = Tooltip.prototype.renderCloseButtonBlock.call(prototype);
    expect(result).toEqual(null);
  });

  it('should return null if boolean prop is false', () => {
    const prototype = {
      props: {
        onCloseButtonClick: () => {},
        showCloseButton: false,
        triggerAction: 'click',
      },
    };

    const result = Tooltip.prototype.renderCloseButtonBlock.call(prototype);
    expect(result).toEqual(null);
  });
});
