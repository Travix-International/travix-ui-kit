Basic autoComplete:

    initialState = {
    disable: false,
    highlight: true,
    options: [{
      value: "Fruits",
      title: true
    }, {
      code: "APL",
      value: "Apple",
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
      value: "Fruits",
      title: true
    }, {
      code: "APL",
      value: "Apple",
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
      <div style={{ width: '50%' }}>
        <Button size="xs" onClick={() => setState({ disable: !state.disable })}>
          {state.disable ? '✅' : ''} disable
        </Button>
        <i> </i>
        <Button size="xs" onClick={() => setState({ highlight: !state.highlight })}>
          {state.highlight ? '✅' : ''} highlight
        </Button>
        <br/><br/>
        <AutoComplete
          onChange={(data) => {
            console.log('OUTPUT', data);
          }}
          onInputUpdate={(value) => {
            console.log('UPDATE', value);
            const newOpts = value
              ? state.originalOptions.filter((i) => i.value.toUpperCase().indexOf(value.toUpperCase()) !== -1)
              : state.originalOptions;
            setState({
              options: newOpts,
            })
          }}
          highlight={state.highlight}
          disabled={state.disable}
          placeholder="autocomplete 1"
          name="a0">
          {state.options.map((item, key) =>
            <AutoCompleteItem
              isTitle={!!item.title}
              value={item.value}
              code={item.code}
              key={key}>
              {item.value}
            </AutoCompleteItem>
          )}
        </AutoComplete>
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
          onChange={(data) => {
            console.log('OUTPUT', data);
          }}
          onInputUpdate={(value) => {
            console.log('UPDATE', value);
            const newOpts = value
              ? state.originalOptions.filter((i) => i.toUpperCase().indexOf(value.toUpperCase()) !== -1)
              : state.originalOptions;
            setState({
              options: newOpts,
            })
          }}
          initialValue={{value: "Apple"}}
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
