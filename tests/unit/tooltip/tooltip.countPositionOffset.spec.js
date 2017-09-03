import Tooltip from '../../../components/tooltip/tooltip';

describe('Tooltip: countPositionOffset', () => {
  it('should return proper object with possible positions', () => {
    const prototype = {
      props: {
        margin: '10px',
        oppositeAxisOffset: '5px',
      },
      container: {
        getBoundingClientRect: jest.fn().mockReturnValue({
          width: 120,
          height: 70,
        }),
      },
    };

    const expected = {
      top: { top: -80, left: '5px' },
      bottom: { bottom: -80, left: '5px' },
      right: { right: -130, bottom: '5px' },
      left: { left: -130, bottom: '5px' },
    };

    const result = Tooltip.prototype.countPositionOffset.call(prototype);

    expect(result).toEqual(expected);
  });
});
