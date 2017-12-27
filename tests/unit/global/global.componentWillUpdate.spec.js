import Global from '../../../components/global/global';

describe('Global: componentWillUnmount', () => {
  it('should call setNoScroll in componentWillUpdate if prop was provided with true', () => {
    const setStub = jest.fn();
    const toggleStub = jest.fn();
    Global.prototype.componentWillUpdate.call({
      setNoScroll: setStub,
      toggleGlobalNoscroll: toggleStub,
    }, { noscroll: true });
    expect(setStub).toHaveBeenCalledTimes(1);
    expect(toggleStub).toHaveBeenCalledTimes(1);
  });

  it('should NOT call setNoScroll in componentWillUpdate if prop was provided with false', () => {
    const setStub = jest.fn();
    const toggleStub = jest.fn();
    Global.prototype.componentWillUpdate.call({
      setNoScroll: setStub,
      toggleGlobalNoscroll: toggleStub,
    }, { noscroll: false });
    expect(setStub).toHaveBeenCalledTimes(0);
    expect(toggleStub).toHaveBeenCalledTimes(0);
  });
});
