Position top:

    initialState = {
      isVisibleTop: false,
      isVisibleRight: true,
      isVisibleBottom: true,
      isVisibleLeft: true,
      isArrow: false,
      isBorder: true,
      isColorBackground: false,
    };

    <div>
      <Checkbox
        checked={state.isVisibleTop}
        name="isVisibleTop"
        onChange={() => setState({ isVisibleTop: !state.isVisibleTop })}
      >
        top
      </Checkbox>
      <Checkbox
        checked={state.isVisibleRight}
        name="isVisibleRight"
        onChange={() => setState({ isVisibleRight: !state.isVisibleRight })}
      >
        right
      </Checkbox>
      <Checkbox
        checked={state.isVisibleBottom}
        name="isVisibleBottom"
        onChange={() => setState({ isVisibleBottom: !state.isVisibleBottom })}
      >
        bottom
      </Checkbox>
      <Checkbox
        checked={state.isVisibleLeft}
        name="isVisibleLeft"
        onChange={() => setState({ isVisibleLeft: !state.isVisibleLeft })}
      >
        left
      </Checkbox>

      <br/>

      <Checkbox
        checked={state.isArrow}
        name="isArrow"
        onChange={() => setState({ isArrow: !state.isArrow })}
      >
        arrow
      </Checkbox>
      <Checkbox
        checked={state.isBorder}
        name="isBorder"
        onChange={() => setState({ isBorder: !state.isBorder })}
      >
        border
      </Checkbox>
      <Checkbox
        checked={state.isColorBackground}
        name="isColorBackground"
        onChange={() => setState({ isColorBackground: !state.isColorBackground })}
      >
        background
      </Checkbox>
      <Badge arrow={state.isArrow} border={state.isBorder} position="top" title="top" visible={state.isVisibleTop}>
        <Badge arrow={state.isArrow} border={state.isBorder} position="right" title="right" visible={state.isVisibleRight}>
          <Badge arrow={state.isArrow} border={state.isBorder} position="bottom" title="bottom" visible={state.isVisibleBottom}>
            <Badge arrow={state.isArrow} border={state.isBorder} position="left" title="left" visible={state.isVisibleLeft}>
              <div style={{border: '1px solid lightgray', padding: '25px 100px', marginTop: '15px', background: state.isColorBackground ? "#3e6161" : "none"}}>
                <Badge arrow={state.isArrow} border={state.isBorder} position="right" title={<span>Left</span>} />
                <Badge arrow={state.isArrow} border={state.isBorder} position="left" title="Right" />
              </div>
            </Badge>
          </Badge>
        </Badge>
      </Badge>
    </div>
