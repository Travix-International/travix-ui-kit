import { mount } from 'enzyme';
import React from 'react';
import Calendar from '../../../components/calendar/calendar';
import { leftPad, normalizeDate } from '../../../components/_helpers';

jest.useFakeTimers();

describe('Calendar (range mode)', () => {
  describe('#render()', () => {
    it('should render the calendar with selectionType as range, initialized in the current date', () => {
      const todayDate = normalizeDate(new Date());

      const wrapper = mount(
        <Calendar selectionType="range" />
      );

      expect(wrapper.props()).toEqual({
        multiplemode: false,
        selectionType: 'range',
      });
      expect(wrapper.state()).toEqual({
        maxLimit: null,
        minLimit: null,
        renderDate: todayDate,
        selectedDates: [null, null],
      });
    });

    it('should set the minLimit to the same date as the first initialDates when provided', () => {
      const initialDate = '2017-03-25';
      const initialDateObj = normalizeDate(new Date(initialDate));

      const wrapper = mount(
        <Calendar initialDates={[initialDate]} selectionType="range" />
      );

      expect(wrapper.props()).toEqual({
        initialDates: [initialDate],
        multiplemode: false,
        selectionType: 'range',
      });
      expect(wrapper.state()).toEqual({
        maxLimit: null,
        minLimit: initialDateObj,
        renderDate: initialDateObj,
        selectedDates: [initialDateObj, null],
      });
    });

    it('should set the minLimit and dates properly and reset them at 3rd click', () => {
      const todayDate = normalizeDate(new Date());

      const wrapper = mount(
        <Calendar selectionType="range" />
      );

      expect(wrapper.props()).toEqual({
        multiplemode: false,
        selectionType: 'range',
      });
      expect(wrapper.state()).toEqual({
        maxLimit: null,
        minLimit: null,
        renderDate: todayDate,
        selectedDates: [null, null],
      });

      const dayBeforeStart = [
        todayDate.getFullYear(),
        leftPad(todayDate.getMonth() + 1),
        '22',
      ].join('-');

      const dayBetweenStartAndEnd = [
        todayDate.getFullYear(),
        leftPad(todayDate.getMonth() + 1),
        '25',
      ].join('-');

      const expectedStart = [
        todayDate.getFullYear(),
        leftPad(todayDate.getMonth() + 1),
        '23',
      ].join('-');

      const expectedEnd = [
        todayDate.getFullYear(),
        leftPad(todayDate.getMonth() + 1),
        '27',
      ].join('-');

      const expectedStartDate = normalizeDate(new Date(expectedStart));
      const expectedEndDate = normalizeDate(new Date(expectedEnd));

      const startRangeOption = wrapper.find(`[data-date="${expectedStart}"]`);
      startRangeOption.simulate('click');

      expect(startRangeOption.props().className.includes('ui-calendar-days-option_selected-start')).toEqual(true);
      expect(wrapper.state().minLimit).toEqual(expectedStartDate);
      expect(wrapper.state().selectedDates[0]).toEqual(expectedStartDate);
      expect(wrapper.find(`[data-date="${dayBeforeStart}"]`).props().disabled).toEqual(true);

      // Selects the end date on the 2nd click
      const endRangeOption = wrapper.find(`[data-date="${expectedEnd}"]`);
      endRangeOption.simulate('click');

      const betweenRangeOption = wrapper.find(`[data-date="${dayBetweenStartAndEnd}"]`);

      expect(endRangeOption.props().className.includes('ui-calendar-days-option_selected-end')).toEqual(true);
      expect(wrapper.state().selectedDates[1]).toEqual(expectedEndDate);
      expect(betweenRangeOption.props().className.includes('ui-calendar-days-option_selected-between')).toEqual(true);

      // On 3rd click resets the calendar, removing the selection
      betweenRangeOption.simulate('click');
      expect(wrapper.state().minLimit).toEqual(null);
      expect(wrapper.state().selectedDates).toEqual([null, null]);
    });

    it('should render the selection as normal (not range) when start and end date are the same', () => {
      const todayDate = normalizeDate(new Date());
      const expectedStart = [
        todayDate.getFullYear(),
        leftPad(todayDate.getMonth() + 1),
        '25',
      ].join('-');


      const expectedEndDate = normalizeDate(new Date(expectedStart));
      const expectedStartDate = normalizeDate(new Date(expectedStart));
      const wrapper = mount(
        <Calendar selectionType="range" />
      );

      const startRangeOption = wrapper.find(`[data-date="${expectedStart}"]`);
      startRangeOption.simulate('click');
      expect(startRangeOption.props().className.includes('ui-calendar-days-option_selected-start')).toEqual(true);
      expect(wrapper.state().minLimit).toEqual(expectedStartDate);
      expect(wrapper.state().selectedDates[0]).toEqual(expectedStartDate);

      // Selects the end date on the 2nd click
      const endRangeOption = wrapper.find(`[data-date="${expectedStart}"]`);
      endRangeOption.simulate('click');

      expect(endRangeOption.props().className.includes('ui-calendar-days-option_selected')).toEqual(true);
      expect(wrapper.state().minLimit).toEqual(null);
      expect(wrapper.state().selectedDates[1]).toEqual(expectedEndDate);
    });

    it('should put the minLimit back to the one passed on props, when resetting it', () => {
      const todayDate = normalizeDate(new Date());
      const differentDay = [
        todayDate.getFullYear(),
        leftPad(todayDate.getMonth() + 1),
        '26',
      ].join('-');
      const expectedStart = [
        todayDate.getFullYear(),
        leftPad(todayDate.getMonth() + 1),
        '25',
      ].join('-');
      const expectedEndDate = normalizeDate(new Date(expectedStart));
      const expectedStartDate = normalizeDate(new Date(expectedStart));
      const minDate = '2017-03-05';
      const expectedInitialMinLimit = normalizeDate(new Date(minDate));

      const wrapper = mount(
        <Calendar minDate={minDate} selectionType="range" />
      );

      expect(wrapper.state().minLimit).toEqual(expectedInitialMinLimit);

      const startRangeOption = wrapper.find(`[data-date="${expectedStart}"]`);
      startRangeOption.simulate('click');
      expect(startRangeOption.props().className.includes('ui-calendar-days-option_selected-start')).toEqual(true);
      expect(wrapper.state().minLimit).toEqual(expectedStartDate);
      expect(wrapper.state().selectedDates[0]).toEqual(expectedStartDate);

      // Selects the end date on the 2nd click
      const endRangeOption = wrapper.find(`[data-date="${expectedStart}"]`);
      endRangeOption.simulate('click');

      expect(endRangeOption.props().className.includes('ui-calendar-days-option_selected')).toEqual(true);
      expect(wrapper.state().minLimit).toEqual(expectedInitialMinLimit);
      expect(wrapper.state().selectedDates[1]).toEqual(expectedEndDate);

      // And resets the dates with the 3rd click
      wrapper.find(`[data-date="${differentDay}"]`).simulate('click');
      expect(wrapper.state().minLimit).toEqual(expectedInitialMinLimit);
      expect(wrapper.state().selectedDates).toEqual([null, null]);
    });

    it('should not set the minLimit and update state if multiplemode', () => {
      const initialDate = '2017-03-25';
      const initialDateObj = normalizeDate(new Date(initialDate));

      const wrapper = mount(
        <Calendar initialDates={[initialDate]} multiplemode selectionType="range" />
      );

      expect(wrapper.props()).toEqual({
        initialDates: [initialDate],
        multiplemode: true,
        selectionType: 'range',
      });
      expect(wrapper.state()).toEqual({
        maxLimit: null,
        minLimit: null,
        renderDate: initialDateObj,
        selectedDates: [initialDateObj, null],
      });

      wrapper.setProps({ initialDates: [initialDate] });

      expect(wrapper.state()).toEqual({
        maxLimit: null,
        minLimit: null,
        renderDate: initialDateObj,
        selectedDates: [initialDateObj, null],
      });
    });

    it('should set renderDate to the month of the date pressed when different from current one', () => {
      const initialDate = '2017-03-05';
      const selectDayMock = jest.fn();

      const wrapper = mount(
        <Calendar
          initialDates={[initialDate]}
          multiplemode
          onSelectDay={selectDayMock}
          selectionType="range"
        />
      );

      /** Clicks to go select the day */
      expect(wrapper.state().renderDate.getMonth()).toEqual(2);

      wrapper.find(`[data-date="2017-04-01"]`).simulate('click');

      expect(wrapper.state().selectedDates[0].getMonth()).toEqual(3);
      expect(wrapper.state().renderDate.getMonth()).toEqual(3);
      expect(selectDayMock.mock.calls.length).toEqual(1);
      expect(selectDayMock.mock.calls[0][0]).toEqual(new Date('2017-04-01T00:00:00.000Z'));
    });
  });
});
