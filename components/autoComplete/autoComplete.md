Basic autoComplete:

    initialState = {
    disable: false,
    highlight: true,
    label: false,
    custom: false,
    options: [{
      value: "Apple",
      title: true
    }, {
      code: "APL1",
      value: "Apple 1",
    }, {
      code: "APL2",
      value: "Apple 2",
    }, {
      code: "APL3",
      value: "Apple 3",
    }, {
      code: "APL4",
      value: "Apple 4",
    }, {
      code: "APR",
      value: "Apricot",
    }, {
      code: "AVO",
      value: "Avocado",
    }, {
      code: "BAN",
      value: "Banana",
    },{
      value: "Vegetables",
      title: true
    }, {
      code: "ASP",
      value: "Asparagus",
    }, {
      code: "AUB",
      value: "Aubergine",
    }, {
      code: "BEE",
      value: "Beetroot",
    }, {
      code: "BRO",
      value: "Broccoli",
    }], originalOptions: [{
      value: "Apple",
      title: true
    }, {
      code: "APL1",
      value: "Apple 1",
    }, {
      code: "APL2",
      value: "Apple 2",
    }, {
      code: "APL3",
      value: "Apple 3",
    }, {
      code: "APL4",
      value: "Apple 4",
    }, {
      code: "APR",
      value: "Apricot",
    }, {
      code: "AVO",
      value: "Avocado",
    }, {
      code: "BAN",
      value: "Banana",
    },{
      value: "Vegetables",
      title: true
    }, {
      code: "ASP",
      value: "Asparagus",
    }, {
      code: "AUB",
      value: "Aubergine",
    }, {
      code: "BEE",
      value: "Beetroot",
    }, {
      code: "BRO",
      value: "Broccoli",
    }]};

    <div>
      <div>
        <Button size="xs" onClick={() => setState({ disable: !state.disable })}>
          {state.disable ? '✅' : ''} disabled
        </Button>
        <i> </i>
        <Button disabled={state.custom} size="xs" onClick={() => setState({ highlight: !state.highlight })}>
          {state.highlight ? '✅' : ''} highlighted
        </Button>
        <i> </i>
        <Button size="xs" onClick={() => setState({ label: !state.label })}>
          {state.label ? '✅' : ''} label
        </Button>
        <i> </i>
        <Button
          size="xs"
          onClick={() =>
            setState({ custom: !state.custom, highlight: state.custom })}>
          {state.custom ? '✅' : ''} custom item
        </Button>
        <br/><br/>
        <div style={{ width: '50%' }}>
          <AutoComplete
            onChange={(data) => {
              console.log('CHANGE', data);
              const newOpts = data
                ? state.originalOptions.filter((i) => (i.code === data.code || i.title))
                : state.originalOptions;
              setState({
                options: newOpts,
                output: data
              })
            }}
            onUpdateInput={(value) => {
              console.log('UPDATE', value);
              const newOpts = value
                ? state.originalOptions.filter((i) => (i.value.toUpperCase().indexOf(value.toUpperCase()) !== -1 || i.title))
                : state.originalOptions;
              setState({
                options: newOpts,
              })
            }}
            highlighted={state.highlight}
            disabled={state.disable}
            label={state.label ? 'Autocomplete' : undefined}
            placeholder="autocomplete 1"
            name="a0">
            {state.options.map((item, key) =>
              <AutoCompleteItem
                isTitle={!!item.title}
                value={item.value}
                code={item.code}
                key={key}>
                {
                  state.custom ? (
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                      <span>{item.value} {item.code ? `(${item.code})` : ''}</span>
                      <span style={{transform: `rotate(${key*30}deg)`}}>{!item.title ? '㋡' : ''}</span>
                    </div>
                  ) : item.value
                }
              </AutoCompleteItem>
            )}
          </AutoComplete>
        </div>
        <div>
          {
            state.output ? (
              <div>
                <br/>
                <span>OUTPUT: </span>
                <span>{JSON.stringify(state.output)}</span>
              </div>
            ) : ''
          }
        </div>
      </div>
    </div>

Preselected autoComplete:

    initialState = {
      options: ["Apple"],
      originalOptions: ["Apple", "Apricot", "Avocado", "Banana"],
    };

    <div>
      <div style={{ width: '50%' }}>
        <AutoComplete
          onUpdateInput={(value) => {
            const newOpts = value
              ? state.originalOptions.filter((i) => i.toUpperCase().indexOf(value.toUpperCase()) !== -1)
              : state.originalOptions;
            setState({
              options: newOpts,
            })
          }}
          defaultValue={{value: "Apple"}}
          name="a3">
          {state.options.map((item, key) =>
            <AutoCompleteItem
              value={item}
              key={key}>
              {item}
            </AutoCompleteItem>
          )}
        </AutoComplete>
      </div>
    </div>
