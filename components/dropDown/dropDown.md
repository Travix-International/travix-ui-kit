Basic dropDown:

    <div>
      <div style={{ width: '50%' }}>
        <DropDown
          onChange={(opts) => {setState({ value: opts.value })}}
          options={[
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
            {value: 3, label: 'Three'},
          ]}
          value={state.value || 1}
        />
      </div>
    </div>

Searchable dropDown:

    <div>
      <div style={{ width: '50%' }}>
        <DropDown
          searchable
          onChange={(opts) => {setState({ value: opts.value })}}
          options={new Array(20).fill(1).map((item, i) => { return { value: i+1, label: i+1 } })}
          value={state.value || 1}
        />
      </div>
    </div>
