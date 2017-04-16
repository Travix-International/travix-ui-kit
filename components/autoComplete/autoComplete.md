Basic autoComplete:

    initialState = {options: [{
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
          highlight
          name="a0">
          {state.options.map((item, key) =>
            <AutoCompleteItem
              isTitle={!!item.title}
              source={item}
              value={item.value}
              code={item.code}
              key={key}>
              {item.value}
            </AutoCompleteItem>
          )}
        </AutoComplete>
      </div>
    </div>

Disabled autoComplete:

    <div>
      <div style={{ width: '50%' }}>
        <AutoComplete name="a1" disabled />
      </div>
    </div>
