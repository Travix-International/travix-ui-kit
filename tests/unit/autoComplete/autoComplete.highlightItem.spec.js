import AutoComplete from '../../../components/autoComplete/autoComplete';

describe('AutoComplete: highlightItem', () => {
  const self = {
    state: {
      inputValue: 'Berlin (?#',
    },
    props: {
      highlightRule: null,
    },
  };

  const str = 'Berlin';

  it('should not be RegExp exeption', () => {
    expect(() => {
      AutoComplete.prototype.highlightItem.call(self, str);
    }).not.toThrow(SyntaxError);
  });
});
