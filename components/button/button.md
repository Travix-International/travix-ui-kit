Basic button:

    initialState = {
      isDisabled: false,
    };

    <div>
      <Checkbox
        checked={state.isDisabled}
        name="isButtonDisabledbasic"
        onChange={() => setState({ isDisabled: !state.isDisabled })}
      >
        Disabled
      </Checkbox>
      <br/>
      <Button disabled={state.isDisabled} onClick={alert}>Show alert</Button><br/><br/>
      <Button disabled={state.isDisabled} dataAttrs={{gtm: 'some-id'}} type="reset">With GTM id</Button><br/><br/>
      <Button disabled={state.isDisabled} mods={['test']} type="reset">With mode</Button><br/><br/>
      <Button disabled={state.isDisabled} mods={['test']} className="my-class">Example with custom class set</Button><br/><br/>
      <Button disabled={state.isDisabled} onMouseUp={() => alert('Mouse Up')}>Example with custom event (onMouseUp)</Button><br/><br/>
    </div>

Sizes:

    initialState = {
      isDisabled: false,
    };

    <div>
      <Checkbox
        checked={state.isDisabled}
        name="isButtonDisabledSizes"
        onChange={() => setState({ isDisabled: !state.isDisabled })}
      >
        Disabled
      </Checkbox>
      <br/>
      <Button disabled={state.isDisabled} type="reset" size="xs">Extra small</Button><br/><br/>
      <Button disabled={state.isDisabled} type="reset" size="s">Small</Button><br/><br/>
      <Button disabled={state.isDisabled} type="reset" size="m">Medium</Button><br/><br/>
      <Button disabled={state.isDisabled} type="reset" size="l">Large</Button><br/><br/>
      <Button disabled={state.isDisabled} type="reset" size="xl">Extra large</Button><br/><br/>
    </div>

Variations - Ghost:

    initialState = {
      isDisabled: false,
    };

    <div>
      <Checkbox
        checked={state.isDisabled}
        name="isButtonDisabledGhost"
        onChange={() => setState({ isDisabled: !state.isDisabled })}
      >
        Disabled
      </Checkbox>
      <br/>
      <Button disabled={state.isDisabled} onClick={alert} variation="ghost" size="xs">Extra small Ghost</Button><br/><br/>
      <Button disabled={state.isDisabled} onClick={alert} variation="ghost" size="s">Small Ghost</Button><br/><br/>
      <Button disabled={state.isDisabled} onClick={alert} variation="ghost" size="m">Medium Ghost</Button><br/><br/>
      <Button disabled={state.isDisabled} onClick={alert} variation="ghost" size="l">Large Ghost</Button><br/><br/>
      <Button disabled={state.isDisabled} onClick={alert} variation="ghost" size="xl">Extra large Ghost</Button><br/><br/>
      <div style={{background: "#005FBB", padding: "10px", display: "inline-block"}}>
        <Button disabled={state.isDisabled} onClick={alert} variation="ghost-inverted" size="s">Small Ghost Inverted</Button><br/><br/>
      </div>
    </div>

Variations - Link:

    initialState = {
      isDisabled: false,
    };

    <div>
      <Checkbox
        checked={state.isDisabled}
        name="isButtonDisabledLink"
        onChange={() => setState({ isDisabled: !state.isDisabled })}
      >
        Disabled
      </Checkbox>
      <br/>
      <Button disabled={state.isDisabled} onClick={alert} variation="link">Link button</Button><br/><br/>
      <p>
        You can put a <Button disabled={state.isDisabled} onClick={alert} variation="link">link button</Button><br/> along with regular text.
      </p>
    </div>
