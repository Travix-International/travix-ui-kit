import DropDown from '../dropDown';

describe('DropDown: onOptionRef', () => {
  it('should call passed onOptionRef handler with correct arguments', () => {
    const onOptionRef = jest.fn();

    DropDown.optionRef(onOptionRef, false)('ref');
    expect(onOptionRef).toBeCalledWith('ref', false);
  });
});
