Basic input:

    <div>
      <div style={{ width: '50%' }}>
        <Input />
      </div>
    </div>

Preselected input:

    <div>
      <div style={{ width: '50%' }}>
        <Input value={state.value !== undefined ? state.value : 'value'} onChange={(e, value) => {setState({ value })}}/>
      </div>
    </div>

Disabled input:

    <div>
      <div style={{ width: '50%' }}>
        <Input disabled />
      </div>
    </div>

Multiline input:

    <div>
      <div style={{ width: '50%' }}>
        <Input multiline />
      </div>
    </div>
