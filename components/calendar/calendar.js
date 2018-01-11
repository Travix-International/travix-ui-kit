import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import { getClassNamesWithMods, getDataAttributes, normalizeDate } from '../_helpers';
import DaysPanel from './panels/days';
import calendarConstants from './constants/calendar';

const {
  CALENDAR_MOVE_TO_NEXT,
  CALENDAR_MOVE_TO_PREVIOUS,
  CALENDAR_SELECTION_TYPE_RANGE,
} = calendarConstants;


/**
 * Processes the given props and the existing state and returns
 * a new state.
 *
 * @function processProps
 * @param {Object} props Props to base the new state on.
 * @param {Object} state (Existing) state to be based on for the existing values.
 * @return {Object} New state to be set/used.
 * @static
 */
function processProps(props) {
  const { initialDates, maxDate, minDate, selectionType, multiplemode } = props;
  const maxLimit = maxDate ? normalizeDate(new Date(maxDate), 23, 59, 59, 999) : null;

  const renderDate = (initialDates && initialDates.length && initialDates[0]) ? new Date(initialDates[0]) : new Date();
  normalizeDate(renderDate);

  let minLimit = minDate ? normalizeDate(new Date(minDate)) : null;
  let selectedDates = [null, null];

  if (initialDates) {
    selectedDates = selectedDates.map((item, idx) => {
      if (!initialDates[idx]) {
        return null;
      }

      return normalizeDate(new Date(initialDates[idx]));
    });
  }

  /**
   * If a minDate or a maxDate is set, let's check if any selectedDates are outside of the boundaries.
   * If so, resets the selectedDates.
   */
  if (minLimit || maxLimit) {
    const isAnyDateOutOfLimit = selectedDates.some(item => (
      item && (
        (minLimit && (minLimit.getTime() > item.getTime())) ||
        (maxLimit && (maxLimit.getTime() < item.getTime()))
      )
    ));

    if (isAnyDateOutOfLimit) {
      selectedDates = [null, null];
      console.warn(`A calendar instance contains a selectedDate outside of the minDate and maxDate boundaries`); // eslint-disable-line
    }
  }

  /** If initialDates is defined and we have a start date, we want to set it as the minLimit */
  if (selectedDates[0] && (selectionType === CALENDAR_SELECTION_TYPE_RANGE && !multiplemode)) {
    minLimit = selectedDates[0];
  }

  /** If the renderDate is not between any of the minLimit and/or maxDate, we need to redefine it. */
  if (minLimit && (renderDate.getMonth() < minLimit.getMonth())) {
    renderDate.setMonth(minLimit.getMonth());
  } else if (maxLimit && (renderDate.getMonth() > maxLimit.getMonth())) {
    renderDate.setMonth(maxLimit.getMonth());
  }

  return {
    maxLimit,
    minLimit,
    renderDate,
    selectedDates,
  };
}

export default class Calendar extends Component {
  constructor(props) {
    super();

    this.moveToMonth = this.moveToMonth.bind(this);
    this.state = processProps(props);
  }

  componentWillReceiveProps(newProps) {
    const { initialDates, maxDate, minDate, selectionType, multiplemode } = newProps;

    let propsChanged = (
      (maxDate !== this.props.maxDate) ||
      (minDate !== this.props.minDate) ||
      (selectionType !== this.props.selectionType)
    );

    if (initialDates) {
      if (this.props.initialDates) {
        propsChanged = propsChanged || initialDates.some((item, idx) => item !== this.props.initialDates[idx]);
      } else {
        propsChanged = true;
      }
    }

    if (propsChanged || (selectionType === CALENDAR_SELECTION_TYPE_RANGE && multiplemode)) {
      this.setState(() => processProps(newProps));
    }
  }

  handleItemMouseDown = (e) => {
    if (typeof this.props.onMouseDown === 'function') {
      this.props.onMouseDown(e);
    }
  };

  /**
   * Changes the renderDate of the calendar to the previous or next month.
   * Also triggers the onNavPreviousMonth/onNavNextMonth when the state gets changed
   * and passes the new date to it.
   *
   * @method moveToMonth
   * @param {String} direction Defines to which month is the calendar moving (previous or next).
   */
  moveToMonth(direction) {
    const { onNavNextMonth, onNavPreviousMonth } = this.props;

    this.setState(({ renderDate }) => {
      renderDate.setMonth(renderDate.getMonth() + (direction === CALENDAR_MOVE_TO_PREVIOUS ? -1 : 1));
      return { renderDate };
    }, () => {
      if ((direction === CALENDAR_MOVE_TO_PREVIOUS) && onNavPreviousMonth) {
        onNavPreviousMonth(this.state.renderDate);
      } else if ((direction === CALENDAR_MOVE_TO_NEXT) && onNavNextMonth) {
        onNavNextMonth(this.state.renderDate);
      }
    });
  }

  /**
   * Handler for the day's selection. Passed to the DaysPanel -> DaysView.
   * Also triggers the onSelectDay function (when passed) after the state is updated,
   * passing the selectedDates array to it.
   *
   * @method onSelectDay
   * @param {Date} dateSelected Date selected by the user.
   */
  onSelectDay(dateSelected) {
    const { onSelectDay, selectionType, minDate, multiplemode } = this.props;

    this.setState((prevState) => {
      let { minLimit, renderDate, selectedDates } = prevState;

      /**
       * If the calendar's selectionType is 'normal', we always set the date selected
       * to the first position of the selectedDates array.
       * If the selectionType is 'range', we need to verify the following requirements:
       *
       *   - If there's no start date selected, then the selected date becomes the start
       * date and the minLimit becomes that same date. Prevents the range selection to the past.
       *
       *   - If there's a start date already selected:
       *
       *     - If there's no end date selected, then the selected date becomes the end date. Also
       * if the start and end dates are the same, it will remove the minLimit as the layout renders
       * them as a 'normal' selection.
       *
       *     - If there's an end date selected and the user is clicking on the start date again, it
       * clears the selections and the limits, resetting the range.
       */
      if (selectionType === CALENDAR_SELECTION_TYPE_RANGE && !multiplemode) {
        if (selectedDates[0]) {
          if (!selectedDates[1]) {
            selectedDates[1] = dateSelected;
            if (selectedDates[0].toDateString() === selectedDates[1].toDateString()) {
              minLimit = minDate ? normalizeDate(new Date(minDate)) : null;
            }
          } else {
            selectedDates = [null, null];
            minLimit = minDate ? normalizeDate(new Date(minDate)) : null;
          }
        } else {
          selectedDates[0] = dateSelected;
          minLimit = dateSelected;
          selectedDates[1] = null;
        }
      } else {
        selectedDates[0] = dateSelected;
      }

      /**
       * If the user selects a day of the previous or next month, the rendered month switches to
       * the one of the selected date.
       */
      if (dateSelected.getMonth() !== renderDate.getMonth()) {
        renderDate = new Date(dateSelected.toDateString());
      }

      return {
        minLimit,
        renderDate,
        selectedDates,
      };
    }, () => {
      if (onSelectDay) {
        const returnValue = (selectionType === CALENDAR_SELECTION_TYPE_RANGE && multiplemode)
          ? dateSelected
          : this.state.selectedDates;
        onSelectDay(returnValue);
      }
    });
  }

  render() {
    const { className, dataAttrs, isDaySelectableFn, locale, navButtons, selectionType } = this.props;

    const mods = this.props.mods ? this.props.mods.slice() : [];
    const { maxLimit, minLimit, renderDate, selectedDates } = this.state;

    const restProps = getDataAttributes(dataAttrs);

    const classes = classnames(
      getClassNamesWithMods('ui-calendar', mods),
      className
    );

    return (
      <div className={classes} {...restProps}>
        <DaysPanel
          isDaySelectableFn={isDaySelectableFn}
          locale={locale}
          maxDate={maxLimit}
          minDate={minLimit}
          navButtons={navButtons}
          onMouseDown={this.handleItemMouseDown}
          onNavNextMonth={() => this.moveToMonth(CALENDAR_MOVE_TO_NEXT)}
          onNavPreviousMonth={() => this.moveToMonth(CALENDAR_MOVE_TO_PREVIOUS)}
          onSelectDay={e => this.onSelectDay(new Date(e.currentTarget.getAttribute('data-date')))}
          renderDate={renderDate}
          selectedDates={selectedDates}
          selectionType={selectionType}
        />
      </div>
    );
  }
}

Calendar.defaultProps = {
  multiplemode: false,
  selectionType: 'normal',
};

Calendar.propTypes = {
  /**
   * Attribute used to set specific classes which will be combined
   * with the component class + mods.
   */
  className: PropTypes.string,

  /**
   * Data attribute. You can use it to set up GTM key or any custom data-* attribute
   */
  dataAttrs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),

  /**
   * Optional. Initial value of the calendar. Defaults to the current date as per the locale.
   */
  initialDates: PropTypes.array,

  /**
   * Optional. Function to be triggered to evaluate if the date (passed as an argument)
   * is selectable. Must return a boolean.
   */
  isDaySelectableFn: PropTypes.func,

  /**
   * Locale definitions, with the calendar's months and weekdays in the right language.
   * Also contains the startWeekDay which defines in which week day starts the week.
   */
  locale: PropTypes.shape({
    months: PropTypes.array,
    weekDays: PropTypes.array,
    startWeekDay: PropTypes.number,
  }),

  /**
   * Sets the max date boundary. Defaults to `null`.
   */
  maxDate: PropTypes.string,

  /**
   * Sets the min date boundary. Defaults to `null`.
   */
  minDate: PropTypes.string,

  /**
   * You can provide set of custom modifications.
   */
  mods: PropTypes.arrayOf(PropTypes.string),

  /**
   * Technical marker for using range mode with multiple calendar instances.
   */
  multiplemode: PropTypes.bool,

  navButtons: PropTypes.shape({
    days: PropTypes.shape({
      next: PropTypes.shape({
        ariaLabel: PropTypes.string,
        displayValue: PropTypes.string,
      }),
      previous: PropTypes.shape({
        ariaLabel: PropTypes.string,
        displayValue: PropTypes.string,
      }),
    }),
  }),

  /**
   * onMouseDown handler
   */
  onMouseDown: PropTypes.func,

  /**
   * Function to be triggered when pressing the nav's "next" button.
   */
  onNavNextMonth: PropTypes.func,

  /**
   * Function to be triggered when pressing the nav's "previous" button.
   */
  onNavPreviousMonth: PropTypes.func,

  /**
   * Function to be triggered when selecting a day.
   */
  onSelectDay: PropTypes.func,

  /**
   * Optional. Type of date selection.
   */
  selectionType: PropTypes.oneOf(['normal', 'range']),
};
