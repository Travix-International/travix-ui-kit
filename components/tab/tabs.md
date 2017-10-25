Basic

    initialState = {
      value: 0,
    };
    <div style={{ marginTop: '15px' }}>
      <div style={{ paddingTop: '15px', backgroundColor: '#FFD05E' }} >
        <Tabs onChange={(value) => {setState({ value });}}>
          <Tab title="One" />
          <Tab title="Two" />
          <Tab title="Three" />
        </Tabs>
      </div>
      <br/>
      <br/>
      <div>Selected tab: {state.value}</div>
    </div>

With content:

    renterContent = (value) => {
      return (
        <div style={{ backgroundColor: '#e4f2ff', padding: '30px' }}>
          {value}
        </div>
      );
    };

    <div style={{ marginTop: '15px', paddingTop: '15px', backgroundColor: '#FFD05E' }}>
      <Tabs initValue="2">
        <Tab value="1" title="One">{this.renterContent('One content')}</Tab>
        <Tab value="2" title="Two">{this.renterContent('Two content')}</Tab>
        <Tab value="3" title="Three">{this.renterContent('Three content')}</Tab>
      </Tabs>
    </div>