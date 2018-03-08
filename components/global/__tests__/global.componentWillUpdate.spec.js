import Global from '../global';

describe('Global: componentWillUnmount', () => {
  it('should call setNoScroll in componentWillUpdate if prop was provided with true', () => {
    const setStub = jest.fn();
    const toggleStub = jest.fn();
    Global.prototype.componentWillUpdate.call({
      props: {
        noscroll: false,
      },
      setNoScroll: setStub,
      toggleGlobalNoscroll: toggleStub,
    }, { noscroll: true });
    expect(setStub).toHaveBeenCalledTimes(1);
    expect(toggleStub).toHaveBeenCalledTimes(1);
    expect(toggleStub).toBeCalledWith(true);
  });

  it('should NOT call setNoScroll in componentWillUpdate if prop was provided with false', () => {
    const setStub = jest.fn();
    const toggleStub = jest.fn();
    Global.prototype.componentWillUpdate.call({
      props: {
        noscroll: true,
      },
      setNoScroll: setStub,
      toggleGlobalNoscroll: toggleStub,
    }, { noscroll: false });
    expect(setStub).toHaveBeenCalledTimes(0);
    expect(toggleStub).toHaveBeenCalledTimes(1);
    expect(toggleStub).toBeCalledWith(false);
  });

  it('should NOT call setNoScroll in componentWillUpdate if prop was provided with false', () => {
    const setStub = jest.fn();
    const toggleStub = jest.fn();
    Global.prototype.componentWillUpdate.call({
      props: {
        noscroll: false,
      },
      setNoScroll: setStub,
      toggleGlobalNoscroll: toggleStub,
    }, { noscroll: false });
    expect(setStub).toHaveBeenCalledTimes(0);
    expect(toggleStub).toHaveBeenCalledTimes(0);
  });
});
