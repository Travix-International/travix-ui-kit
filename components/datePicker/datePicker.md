Basic datePicker:

    valueFormatter = (date) => {
      return new Date(date).toDateString().split(' ').slice(1).join(' ');
    };

    <div style={{ width: '150px', display: 'flex', justifyContent: 'space-between' }}>
      <DatePicker
        onChange={(value) => {
          setState({ value: this.formatDate(value[0]) });
        }}
        minDate={state.currentDate}
        valueFormatterFn={this.valueFormatter}
        value={state.value}
        name="picker"
        label="date picker"
      />
    </div>

Basic disabled datePicker with default value:

    valueFormatter = (date) => {
      return new Date(date).toDateString().split(' ').slice(1).join(' ');
    };

    <div style={{ width: '150px', display: 'flex', justifyContent: 'space-between' }}>
      <DatePicker
        onChange={(value) => {
          setState({ value: this.formatDate(value[0]) });
        }}
        valueFormatterFn={this.valueFormatter}
        disabled
        value="2017-05-05"
      />
    </div>

Multiple datePicker with range mode:

    addInitialZero = (value) => {
      return (value < 10) ? `0${value.toString()}` : value.toString();
    };

    formatDate = (d) => {
      return `${d.getFullYear()}-${this.addInitialZero(d.getMonth() + 1)}-${this.addInitialZero(d.getDate())}`;
    };

    valueFormatter = (date) => {
      return new Date(date).toDateString().split(' ').slice(1).join(' ');
    };

    initialState = {
      currentDate: this.formatDate(new Date()),
      maxDate: null,
      minDate: null,
      date1: null,
      date2: null,
    };

    <div style={{ width: '90%', display: 'flex' }}>
      <div style={{ flexBasis: '150px' }}>
        <DatePicker
          initialDates={[state.date1, state.date2]}
          onChange={(value) => {
            const date1 = this.formatDate(value);
            let date2 = state.date2;
            if (date2 && (new Date(date1) > new Date(state.date2)))  {
              date2 = null;
            }
            setState({ date1, date2 });
            this.date2.focusInput();
          }}
          minDate={state.currentDate}
          valueFormatterFn={this.valueFormatter}
          value={state.date1}
          selectionType="range"
          placeholder="start"
          open
        />
      </div>
      <div style={{ flexBasis: '10px' }} />
      <div style={{ flexBasis: '150px' }}>
        <DatePicker
          initialDates={[state.date1, state.date2]}
          onChange={(value) => {setState({ date2: this.formatDate(value) });}}
          valueFormatterFn={this.valueFormatter}
          value={state.date2}
          minDate={state.date1}
          ref={elem => this.date2 = elem}
          selectionType="range"
          placeholder="end"
        />
      </div>
    </div>
