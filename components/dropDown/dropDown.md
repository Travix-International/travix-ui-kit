Basic dropDown:

    <div>
      <div style={{ width: '50%' }}>
        <DropDown
          onChange={(opts) => {setState({ value: opts.value })}}
          options={[
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
            { value: 3, label: 'Three' },
          ]}
          value={state.value}
          placeholder="basic dropdown"
        />
      </div>
    </div>

Searchable dropDown:

    <div>
      <div style={{ width: '50%' }}>
        <DropDown
          searchable
          scrollMenuIntoView
          onChange={(opts) => {setState({ value: opts.value })}}
          options={new Array(20).fill(1).map((item, i) => { return { value: i+1, label: i+1 } })}
          value={state.value}
          placeholder="searchable dropdown"
        />
      </div>
    </div>

DropDown with filter mode:

    initialState = {filterOptions: [
      { label: 'One', value: 'One', disabled: true },
      { label: 'Two', value: 'Two', checked: true },
      { label: 'Three', value: 'Three' },
      { label: 'Four', value: 'Four' },
    ]};

    <div>
      <div>{state.filterOptions.filter(i => i.checked).map(i => i.label).join(', ')}</div>
      <div style={{ width: '50%', display: 'flex' }}>
        <DropDown
          filterMode
          onChange={(option, optionIndex) => {
            setState({
              filterOptions: [
                ...state.filterOptions.slice(0, optionIndex),
                { ...option, checked: !option.checked },
                ...state.filterOptions.slice(optionIndex + 1)
              ]
            })
          }}
          options={state.filterOptions}
          value={state.value}
          placeholder="filter mode"
          filterKey="filterKey"
        />
      </div>
    </div>
