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

    initialState = {filterOptions1: [
      { label: 'One', value: 'One', disabled: true },
      { label: 'Two', value: 'Two', checked: true },
      { label: 'Three', value: 'Three' },
      { label: 'Four', value: 'Four' },
    ], filterOptions2: [
      { label: 'One', value: 'One' },
      { label: 'Two', value: 'Two'  },
      { label: 'Three', value: 'Three' },
      { label: 'Four', value: 'Four' },
    ]};

    <div>
      <div>filter1: {state.filterOptions1.filter(i => i.checked).map(i => i.label).join(', ')}</div>
      <div>filter2: {state.filterOptions2.filter(i => i.checked).map(i => i.label).join(', ')}</div>
      <br/>
      <div style={{ width: '50%', display: 'flex', justifyContent: 'space-between' }}>
        <DropDown
          filterMode
          onChange={(option, optionIndex, filterKey) => {
            setState({
              [`filterOptions${filterKey}`]: [
                ...state[`filterOptions${filterKey}`].slice(0, optionIndex),
                { ...option, checked: !option.checked },
                ...state[`filterOptions${filterKey}`].slice(optionIndex + 1)
              ]
            })
          }}
          options={state.filterOptions1}
          placeholder="filter1"
          filterKey="1"
        />
        <DropDown
          filterMode
          onChange={(option, optionIndex, filterKey) => {
            setState({
              [`filterOptions${filterKey}`]: [
                ...state[`filterOptions${filterKey}`].slice(0, optionIndex),
                { ...option, checked: !option.checked },
                ...state[`filterOptions${filterKey}`].slice(optionIndex + 1)
              ]
            })
          }}
          options={state.filterOptions2}
          placeholder="filter2"
          filterKey="2"
        />
      </div>
    </div>
