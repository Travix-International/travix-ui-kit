Position top:

    initialState = {
      isVisibleTop: false,
      isVisibleRight: true,
      isVisibleBottom: true,
      isVisibleLeft: true,
      isArrow: false,
      isBorder: true,
    };

    <div>
      <Checkbox name="isVisibleTop" checked={state.isVisibleTop} onChange={() => setState({ isVisibleTop: !state.isVisibleTop })}>top</Checkbox>
      <Checkbox name="isVisibleRight" checked={state.isVisibleRight} onChange={() => setState({ isVisibleRight: !state.isVisibleRight })}>right</Checkbox>
      <Checkbox name="isVisibleBottom" checked={state.isVisibleBottom} onChange={() => setState({ isVisibleBottom: !state.isVisibleBottom })}>bottom</Checkbox>
      <Checkbox name="isVisibleLeft" checked={state.isVisibleLeft} onChange={() => setState({ isVisibleLeft: !state.isVisibleLeft })}>left</Checkbox>

      <br/>

      <Checkbox name="isArrow" checked={state.isArrow} onChange={() => setState({ isArrow: !state.isArrow })}>arrow</Checkbox>
      <Checkbox name="isBorder" checked={state.isBorder} onChange={() => setState({ isBorder: !state.isBorder })}>border</Checkbox>

      <Badge arrow={state.isArrow} border={state.isBorder} position="top" title="top" visible={state.isVisibleTop}>
        <Badge arrow={state.isArrow} border={state.isBorder} position="right" title="right" visible={state.isVisibleRight}>
          <Badge arrow={state.isArrow} border={state.isBorder} position="bottom" title="bottom" visible={state.isVisibleBottom}>
            <Badge arrow={state.isArrow} border={state.isBorder} position="left" title="left" visible={state.isVisibleLeft}>
              <div style={{border: '1px solid lightgray', padding: '25px 100px', marginTop: '15px'}}>
                <Badge arrow={state.isArrow} border={state.isBorder} position="right" title={<span>Left</span>} />
                <Badge arrow={state.isArrow} border={state.isBorder} position="left" title="Right" />
              </div>
            </Badge>
          </Badge>
        </Badge>
      </Badge>
    </div>
