import { mount, shallow } from 'enzyme';
import React from 'react';
import Calendar from '../../../components/calendar/calendar';
import CalendarWrapper from './calendarWrapper.mock';
import { leftPad, normalizeDate } from '../../../components/_helpers';

describe('Calendar (normal mode)', () => {
  let RealDate;

  beforeAll(() => {
    RealDate = Date;
    global.Date = function FakeDate(...args) {
      const date = args.length === 0 ? new RealDate('2017-03-01') : new RealDate(...args);
      return date;
    };
    Object.setPrototypeOf(global.Date, RealDate);
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  describe('#render()', () => {
    it('should render the calendar with selectionType as normal, initialized in the current date', () => {
      const todayDate = normalizeDate(new Date());
      const wrapper = mount(
        <Calendar />
      );

      expect(wrapper.props()).toEqual({
        multiplemode: false,
        selectionType: 'normal',
      });
      expect(wrapper.state()).toEqual({
        maxLimit: null,
        minLimit: null,
        renderDate: todayDate,
        selectedDates: [null, null],
      });
    });

    it('should not mutate props', () => {
      const mods = ['test'];

      shallow(<Calendar mods={mods} />);
      expect(mods.length).toEqual(1);
      expect(mods[0]).toEqual('test');
    });

    it('should set renderDate and not minLimit, with a given "initalDates" attribute', () => {
      const initialDate = '2017-03-20';
      const initialDateObject = normalizeDate(new Date(initialDate));

      const wrapper = mount(
        <Calendar initialDates={[initialDate]} />
      );

      expect(wrapper.props()).toEqual({
        initialDates: [initialDate],
        multiplemode: false,
        selectionType: 'normal',
      });
      expect(wrapper.state()).toEqual({
        maxLimit: null,
        minLimit: null,
        renderDate: initialDateObject,
        selectedDates: [initialDateObject, null],
      });
    });

    it('should set maxLimit, with a given "maxDate" attribute', () => {
      const maxDate = '2017-03-20';
      const maxDateObject = normalizeDate(new Date(maxDate), 23, 59, 59, 999);

      const todayDate = new Date();
      const renderDateYYYYMMDD = [
        maxDateObject.getFullYear(),
        leftPad(maxDateObject.getMonth() + 1),
        leftPad(todayDate.getDate()),
      ].join('-');

      const renderDate = normalizeDate(new Date(renderDateYYYYMMDD));

      const wrapper = mount(
        <Calendar maxDate={maxDate} />
      );

      expect(wrapper.props()).toEqual({
        maxDate,
        multiplemode: false,
        selectionType: 'normal',
      });
      expect(wrapper.state()).toEqual({
        maxLimit: maxDateObject,
        minLimit: null,
        renderDate,
        selectedDates: [null, null],
      });
    });

    it('should set minLimit, with a given "minDate" attribute', () => {
      const minDate = '2017-03-20';
      const todayDate = normalizeDate(new Date());
      const minDateObject = normalizeDate(new Date(minDate));

      const wrapper = mount(
        <Calendar minDate={minDate} />
      );

      expect(wrapper.props()).toEqual({
        minDate,
        multiplemode: false,
        selectionType: 'normal',
      });
      expect(wrapper.state()).toEqual({
        maxLimit: null,
        minLimit: minDateObject,
        renderDate: todayDate,
        selectedDates: [null, null],
      });
    });

    it('should reset selectedDates, when at least one of the initialDates are outside min/max limit', () => {
      const initialDates = ['2017-02-23', '2017-03-29'];
      const maxDate = '2017-03-25';
      const maxDateObject = normalizeDate(new Date(maxDate), 23, 59, 59, 999);
      const minDate = '2017-03-20';
      const minDateObject = normalizeDate(new Date(minDate));

      const wrapper = mount(
        <Calendar initialDates={initialDates} maxDate={maxDate} minDate={minDate} />
      );

      const expectedRenderDate = normalizeDate(new Date(initialDates[0]));
      expectedRenderDate.setMonth(minDateObject.getMonth());

      expect(wrapper.props()).toEqual({
        initialDates,
        maxDate,
        minDate,
        multiplemode: false,
        selectionType: 'normal',
      });
      expect(wrapper.state()).toEqual({
        maxLimit: maxDateObject,
        minLimit: minDateObject,
        renderDate: expectedRenderDate,
        selectedDates: [null, null],
      });


      const initialDates2 = ['2017-04-21', '2017-04-24'];
      const expectedRenderDate2 = normalizeDate(new Date(initialDates2[0]));
      expectedRenderDate2.setMonth(maxDateObject.getMonth());
      const wrapper2 = mount(
        <Calendar initialDates={initialDates2} maxDate={maxDate} minDate={minDate} />
      );

      expect(wrapper2.props()).toEqual({
        initialDates: initialDates2,
        maxDate,
        minDate,
        multiplemode: false,
        selectionType: 'normal',
      });
      expect(wrapper2.state()).toEqual({
        maxLimit: maxDateObject,
        minLimit: minDateObject,
        renderDate: expectedRenderDate2,
        selectedDates: [null, null],
      });
    });

    it('should set renderDate to next/previous months when the next/previous btns are pressed', () => {
      const initialDate = '2017-03-05';
      const initialDateObject = normalizeDate(new Date(initialDate));
      const nextMonthDateObj = normalizeDate(new Date(initialDate));

      const nextMock = jest.fn();
      const previousMock = jest.fn();

      const wrapper = mount(
        <Calendar
          initialDates={[initialDate]}
          onNavNextMonth={nextMock}
          onNavPreviousMonth={previousMock}
        />
      );

      /** Clicks to go next month */
      wrapper.find('.ui-calendar-days__next-month').simulate('click');

      nextMonthDateObj.setMonth(nextMonthDateObj.getMonth() + 1);

      expect(wrapper.state().renderDate).toEqual(nextMonthDateObj);
      expect(nextMock.mock.calls.length).toEqual(1);
      expect(nextMock.mock.calls[0][0]).toEqual(wrapper.state().renderDate);

      /** Clicks to go next month */
      wrapper.find('.ui-calendar-days__previous-month').simulate('click');

      expect(wrapper.state().renderDate).toEqual(initialDateObject);
      expect(previousMock.mock.calls.length).toEqual(1);
      expect(previousMock.mock.calls[0][0]).toEqual(wrapper.state().renderDate);
    });

    it('should set selectedDate to the date of the button pressed', () => {
      const initialDate = '2017-03-05';

      const wrapper = mount(
        <Calendar initialDates={[initialDate]} />
      );

      /** Clicks to go select the day */
      wrapper.find(`[data-date="2017-03-25"]`).simulate('click');

      expect(wrapper.state().selectedDates[0].getDate()).toEqual(25);
    });

    it('should set renderDate to the month of the date pressed when different from current one', () => {
      const initialDate = '2017-03-05';
      const selectDayMock = jest.fn();

      const wrapper = mount(
        <Calendar initialDates={[initialDate]} onSelectDay={selectDayMock} />
      );

      /** Clicks to go select the day */
      expect(wrapper.state().renderDate.getMonth()).toEqual(2);

      wrapper.find(`[data-date="2017-04-01"]`).simulate('click');

      expect(wrapper.state().selectedDates[0].getMonth()).toEqual(3);
      expect(wrapper.state().renderDate.getMonth()).toEqual(3);
      expect(selectDayMock.mock.calls.length).toEqual(1);
      expect(selectDayMock.mock.calls[0][0]).toEqual(wrapper.state().selectedDates);
    });

    it('should only change the renderDate and do nothing else if nav callbacks are not defined', () => {
      const initialDate = '2017-03-05';
      const initialDateObject = normalizeDate(new Date(initialDate));
      const nextMonthDateObj = normalizeDate(new Date(initialDate));

      const wrapper = mount(
        <Calendar initialDates={[initialDate]} />
      );

      /** Clicks to go next month */
      wrapper.find('.ui-calendar-days__next-month').simulate('click');

      nextMonthDateObj.setMonth(nextMonthDateObj.getMonth() + 1);

      expect(wrapper.state().renderDate).toEqual(nextMonthDateObj);

      /** Clicks to go next month */
      wrapper.find('.ui-calendar-days__previous-month').simulate('click');

      expect(wrapper.state().renderDate).toEqual(initialDateObject);
    });

    it('should only change the selectedDate and do nothing else if selection callbacks are not defined', () => {
      const initialDate = '2017-03-05';
      const selectedDate = '2017-03-20';
      const expectedSelectedDate = normalizeDate(new Date(selectedDate));

      const wrapper = mount(
        <Calendar initialDates={[initialDate]} />
      );

      /** Clicks to go next month */
      wrapper.find(`[data-date="${selectedDate}"]`).simulate('click');


      expect(wrapper.state().selectedDates).toEqual([expectedSelectedDate, null]);
    });

    it('should only be able to select a date that fits the isDaySelectableFn condition, when set', () => {
      const initialDate = '2017-03-05';
      const nonSelectableDate = '2017-03-20';
      const selectableDate = '2017-03-21';

      const isDaySelectableFn = dt => dt.getDate() === 21;
      const onSelectDayMock = jest.fn();

      const initialDateObject = normalizeDate(new Date(initialDate));
      const selectableDateObject = normalizeDate(new Date(selectableDate));

      const wrapper = mount(
        <Calendar initialDates={[initialDate]} isDaySelectableFn={isDaySelectableFn} onSelectDay={onSelectDayMock} />
      );

      expect(wrapper.state().selectedDates).toEqual([initialDateObject, null]);

      wrapper.find(`[data-date="${nonSelectableDate}"]`).simulate('click');
      expect(wrapper.state().selectedDates).toEqual([initialDateObject, null]);

      wrapper.find(`[data-date="${selectableDate}"]`).simulate('click');
      expect(wrapper.state().selectedDates).toEqual([selectableDateObject, null]);

      expect(onSelectDayMock.mock.calls.length).toEqual(1);
      expect(onSelectDayMock.mock.calls[0][0]).toBeInstanceOf(Array);
      expect(onSelectDayMock.mock.calls[0][0][0]).toBeInstanceOf(RealDate);
      expect(onSelectDayMock.mock.calls[0][0][1]).toEqual(null);
    });

    it('should merge the locale definition with the default one', () => {
      const myLocale = {
        weekDays: [
          { name: 'Domingo', short: 'Dom' },
          { name: 'Segunda', short: 'Seg' },
          { name: 'Terça', short: 'Ter' },
          { name: 'Quarta', short: 'Qua' },
          { name: 'Quinta', short: 'Qui' },
          { name: 'Sexta', short: 'Sex' },
          { name: 'Sábado', short: 'Sáb' },
        ],
      };

      const wrapper = mount(
        <Calendar initialDates={["2017-10-05"]} locale={myLocale} />
      );

      expect(wrapper.find('.ui-calendar-days__weekday').first().text()).toEqual('Seg');
    });

    it('should merge the locale definition with the default one', () => {
      const myLocale = { startWeekDay: 0 };

      const wrapper = mount(
        <Calendar locale={myLocale} />
      );

      expect(wrapper.find('.ui-calendar-days__weekday').first().text()).toEqual('Sun');
    });

    it('should apply the new initialDates on Calendar even when changed in runtime by the parent component', () => {
      const wrapper = mount(
        <CalendarWrapper initialDates={['2017-03-03']} />
      );

      expect(wrapper.find('Calendar').props().initialDates[0]).toEqual('2017-03-03');

      wrapper.find('#changeInitialDate').simulate('click');

      expect(wrapper.find('Calendar').props().initialDates[0]).toEqual('2017-04-03');
    });

    it('should render the Calendar and re-render on change of the props', () => {
      const wrapper = mount(
        <CalendarWrapper />
      );

      wrapper.find('#changeInitialDate').simulate('click');

      expect(wrapper.find('Calendar').props().initialDates[0]).toEqual('2017-04-03');

      // Check what happens when the props are the same.
      wrapper.find('#changeInitialDate').simulate('click');

      expect(wrapper.find('Calendar').props().initialDates[0]).toEqual('2017-04-03');
    });

    it('should apply the new minDate on Calendar even when changed by the parent component', () => {
      const wrapper = mount(
        <CalendarWrapper minDate="2017-03-01" />
      );

      expect(wrapper.find('Calendar').props().minDate).toEqual('2017-03-01');

      wrapper.find('#changeMinDate').simulate('click');

      expect(wrapper.find('Calendar').props().minDate).toEqual('2017-04-01');
    });

    it('should set the navButtons display values as defined on props, using default aria-labels', () => {
      const navButtons = {
        days: {
          next: {
            displayValue: '›',
          },
          previous: {
            displayValue: '‹',
          },
        },
      };

      const wrapper = mount(
        <Calendar initialDates={['2017-03-03']} navButtons={navButtons} />
      );

      const nextBtn = wrapper.find('.ui-calendar-days__next-month');
      const previousBtn = wrapper.find('.ui-calendar-days__previous-month');
      expect(nextBtn.text()).toEqual(navButtons.days.next.displayValue);
      expect(previousBtn.text()).toEqual(navButtons.days.previous.displayValue);

      expect(nextBtn.props()['aria-label']).toEqual('April');
      expect(previousBtn.props()['aria-label']).toEqual('February');
    });

    it('should use the aria-labels defined on the navButtons attribute', () => {
      const navButtons = {
        days: {
          next: {
            ariaLabel: 'Next month',
            displayValue: '›',
          },
          previous: {
            ariaLabel: 'Previous month',
            displayValue: '‹',
          },
        },
      };

      const wrapper = mount(
        <Calendar initialDates={['2017-03-03']} navButtons={navButtons} />
      );

      const nextBtn = wrapper.find('.ui-calendar-days__next-month');
      const previousBtn = wrapper.find('.ui-calendar-days__previous-month');
      expect(nextBtn.text()).toEqual(navButtons.days.next.displayValue);
      expect(previousBtn.text()).toEqual(navButtons.days.previous.displayValue);

      expect(nextBtn.props()['aria-label']).toEqual(navButtons.days.next.ariaLabel);
      expect(previousBtn.props()['aria-label']).toEqual(navButtons.days.previous.ariaLabel);
    });

    it('should use be possible to navigate between months', () => {
      const wrapper = mount(
        <Calendar initialDates={['2017-01-01']} />
      );

      const daysView = wrapper.find('Days').at(1);
      const nextBtn = wrapper.find('.ui-calendar-days__next-month');
      const previousBtn = wrapper.find('.ui-calendar-days__previous-month');

      previousBtn.simulate('click');
      expect(daysView.props().renderDate.getMonth()).toEqual(11);

      nextBtn.simulate('click');
      expect(daysView.props().renderDate.getMonth()).toEqual(0);

      nextBtn.simulate('click');
      expect(daysView.props().renderDate.getMonth()).toEqual(1);
    });
  });
});
