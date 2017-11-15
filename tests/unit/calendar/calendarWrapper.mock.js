const React = require('react');
const PropTypes = require('prop-types');
const Calendar = require('../../../components/calendar/calendar');

export default class CalendarWrapper extends React.Component {
  constructor(props) {
    super();

    this.changeInitialDates = this.changeInitialDates.bind(this);
    this.changeMinDate = this.changeMinDate.bind(this);
    this.state = {
      initialDates: props.initialDates ? [].concat(props.initialDates) : undefined,
      minDate: props.minDate,
    };
  }

  changeInitialDates() {
    this.setState((prevState) => {
      prevState.initialDates = ['2017-04-03', null];
      return prevState;
    });
  }

  changeMinDate() {
    this.setState((prevState) => {
      prevState.minDate = '2017-04-01';
      return prevState;
    });
  }

  render() {
    return (
      <div>
        <Calendar {...this.state} />
        <button id="changeInitialDate" onClick={this.changeInitialDates}>Change date</button>
        <button id="changeMinDate" onClick={this.changeMinDate}>Change date</button>
      </div>
    );
  }
}

CalendarWrapper.propTypes = {
  initialDates: PropTypes.arrayOf(PropTypes.string),
  minDate: PropTypes.string,
};
