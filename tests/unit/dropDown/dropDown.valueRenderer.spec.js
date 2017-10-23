import DropDown from '../../../components/dropDown/dropDown';

describe('DropDown: valueRenderer', () => {
  it('should Renderer value item with correct props', () => {
    const options = [
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
      { value: 3, label: 'Three' },
    ];

    const props = options[0];

    const value = DropDown.valueRenderer(props);

    expect(value.props).toEqual({
      children: 'One',
      className: 'Select-value-label-icon',
    });
  });
});
