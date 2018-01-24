Basic input:

    <div>
      <div style={{ width: '50%' }}>
        <Input />
      </div>
    </div>

Preselected input:

    <div>
      <div style={{ width: '50%' }}>
        <Input value={state.value !== undefined ? state.value : 'value'} onChange={(e, value) => { setState({ value: e.target.value }); }}/>
      </div>
    </div>

Disabled input:

    <div>
      <div style={{ width: '50%' }}>
        <Input disabled />
      </div>
    </div>

Input with error status:

    <div className="input-with-status-error">
      <style dangerouslySetInnerHTML={{__html: `
        .input-with-status-error * {
          box-sizing: border-box;
        }
        .ui-input_error + .ui-input-status:before {
          content: '✗';
        }
      `}} />
      <div style={{ width: '50%' }}>
        <Input status="error" />
      </div>
    </div>

Input with valid status:

    <div className="input-with-status-valid">
      <style dangerouslySetInnerHTML={{__html: `
        .input-with-status-valid * {
          box-sizing: border-box;
        }
        .ui-input_valid + .ui-input-status:before {
          content: '✅';
        }
      `}} />
      <div style={{ width: '50%' }}>
        <Input status="valid" />
      </div>
    </div>

Multiline input:

    <div>
      <div style={{ width: '50%' }}>
        <Input multiline />
      </div>
    </div>
