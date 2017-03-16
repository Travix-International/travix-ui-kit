Basic calendar:

    <div>
      <Calendar
        initialDates={["2017-03-21","2017-03-29"]}
        onSelectDay={dts => document.getElementById('calendar-output').value = dts}
        selectionType="range"
      /><br />
      <output id="calendar-output">Please select a date!</output><br />
    </div>
