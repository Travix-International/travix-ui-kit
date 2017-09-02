import { getOffset } from '../../../components/tooltip/tooltip';

describe('getOffset', () => {
  it('should return proper number - offset based on length & margin', () => {
    const width = '120px';
    const margin = '15px';
    const expected = -135;

    expect(getOffset(width, margin)).toEqual(expected);
  });

  it('should return proper number - offset based on length & margin', () => {
    const width = '120px';
    const margin = '0';
    const expected = -120;

    expect(getOffset(width, margin)).toEqual(expected);
  });

  it('should return proper number - offset based on length & margin', () => {
    const width = '120px';
    const margin = '-10px';
    const expected = -110;

    expect(getOffset(width, margin)).toEqual(expected);
  });
});
