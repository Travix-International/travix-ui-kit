Position top:

    initialState = {
      position: 'top',
      isArrow: false,
      isBorder: true,
      isCentered: false,
      isColorBackground: false,
      isReversed: false,
      labelText: 'Label'
    };

    <div>
      <RadioButton
        checked={state.position === 'top'}
        id="position-top"
        name="position"
        onChange={() => setState({ position: 'top' })}
      >
        Top
      </RadioButton>
      <RadioButton
        checked={state.position === 'bottom'}
        id="position-bottom"
        name="position"
        onChange={() => setState({ position: 'bottom' })}
      >
        Bottom
      </RadioButton>
      <RadioButton
        checked={state.position === 'left'}
        id="position-left"
        name="position"
        onChange={() => setState({ position: 'left' })}
      >
        Left
      </RadioButton>
      <RadioButton
        checked={state.position === 'right'}
        id="position-right"
        name="position"
        onChange={() => setState({ position: 'right' })}
      >
        Right
      </RadioButton>

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
      <Checkbox
        checked={state.isCentered}
        name="isCentered"
        onChange={() => setState({ isCentered: !state.isCentered })}
      >
        centered
      </Checkbox>
      <Checkbox
        checked={state.isReversed}
        name="isReversed"
        onChange={() => setState({ isReversed: !state.isReversed })}
      >
        reversed
      </Checkbox>

      <Badge
        arrow={state.isArrow}
        border={state.isBorder}
        centered={state.isCentered}
        position={state.position}
        reversed={state.isReversed}
        title={state.labelText}
        visible={state.isVisibleTop}
      >
        <div style={{
          background: state.isColorBackground ? "#3e6161" : "none",
          border: '1px solid lightgray',
          marginTop: '15px',
          padding: '25px 100px',
        }}>
          <br /><br /><br />
          <Input
            onChange={(e) => setState({labelText: e.target.value})}
            type="text"
            value={state.labelText}
          />
          <br /><br /><br />
        </div>
      </Badge>
    </div>
