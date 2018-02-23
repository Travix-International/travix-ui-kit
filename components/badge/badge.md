Position top:

    initialState = {
      align: 'start',
      position: 'top',
      isArrow: false,
      isBorder: true,
      isCentered: false,
      isColorBackground: false,
      isReversed: false,
      labelText: 'Label'
    };

    <div>
      <div style={{display: 'flex'}}>
        <div>
          <h3>Position:</h3>
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
        </div>

        <div>
          <h3>Align:</h3>
          <RadioButton
            checked={state.align === 'start'}
            id="align-start"
            name="align"
            onChange={() => setState({ align: 'start' })}
          >
            Start
          </RadioButton>
          <RadioButton
            checked={state.align === 'center'}
            id="align-center"
            name="align"
            onChange={() => setState({ align: 'center' })}
          >
            Center
          </RadioButton>
          <RadioButton
            checked={state.align === 'end'}
            id="align-end"
            name="align"
            onChange={() => setState({ align: 'end' })}
          >
            End
          </RadioButton>
        </div>

        <div>
          <h3>Additional props:</h3>
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
        </div>
      </div>

      <Badge
        align={state.align}
        arrow={state.isArrow}
        border={state.isBorder}
        position={state.position}
        title={state.labelText}
        visible={state.isVisibleTop}
      >
        <div style={{
          background: state.isColorBackground ? "#3e6161" : "none",
          border: '1px solid lightgray',
          marginTop: '15px',
          padding: '50px 60px 50px 30px',
        }}>
          <Input
            onChange={(e) => setState({labelText: e.target.value})}
            type="text"
            value={state.labelText}
          />
          <br />
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Badge position="left" title="Left" arrow={state.isArrow} border={state.isBorder} />
            <Badge position="right" title="Right" arrow={state.isArrow} border={state.isBorder} />
          </div>
        </div>
      </Badge>
    </div>
