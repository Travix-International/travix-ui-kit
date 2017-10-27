Basic

    initialState = {
      value: '0',
    };

    <div style={{ marginTop: '15px' }}>
      <div style={{ paddingTop: '15px', backgroundColor: '#FFD05E' }} >
        <Tabs name="tabs1" onChange={(value) => {setState({ value });}}>
          <Tab title="One" />
          <Tab title="Two" />
        </Tabs>
      </div>
      <br/>
      <br/>
      <div>Selected tab: {state.value}</div>
    </div>

With content:

    initialState = {
      value: '2',
    };

    renderContent = (value) => {
      return (
        <div style={{ backgroundColor: '#e4f2ff', padding: '30px' }}>
          {value}
        </div>
      );
    };

    renderTabContent = (value) => {
      return (
        <div style={{ padding: '30px', transform: 'rotate(-10deg)' }}>
          <span><span> ㋡ </span> {value} </span>
        </div>
      );
    };

    handleChange = (event) => {
      setState({value: event.target.value.toString()});
    },

    <div>
      <div>Selected tab:</div>
      <input 
        type="range" 
        min="1" max="4"
        value={state.value} 
        onChange={this.handleChange}
        step="1"
      />
      <br/>
      <div style={{ marginTop: '15px', paddingTop: '15px', backgroundColor: '#FFD05E' }}>
        <Tabs name="tabs2" initValue={state.value} onChange={(value) => {setState({ value });}}>
          <Tab value="1" title={this.renderTabContent('One')}>{this.renderContent('One content')}</Tab>
          <Tab value="2" title={this.renderTabContent('Two')}>{this.renderContent('Two content')}</Tab>
          <Tab value="3" title={this.renderTabContent('Three')}>{this.renderContent('Three content')}</Tab>
          <Tab value="4" title={this.renderTabContent('Four')}>{this.renderContent('Four content')}</Tab>
        </Tabs>
      </div>
    </div>