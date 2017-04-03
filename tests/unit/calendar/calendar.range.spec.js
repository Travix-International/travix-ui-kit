import { mount } from 'enzyme';
import React from 'react';
import Calendar from '../../../components/calendar/calendar';
import { normalizeDate } from '../../../components/_helpers';

describe('Calendar (range mode)', () => {
  describe('#render()', () => {
    it('should render the calendar with selectionType as range, initialized in the current date', () => {
      const todayDate = normalizeDate(new Date());

      const wrapper = mount(
        <Calendar selectionType="range" />
      );

      expect(wrapper.props()).toEqual({
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
        selectionType: 'range',
      });
      expect(wrapper.state()).toEqual({
        maxLimit: null,
        minLimit: null,
        renderDate: todayDate,
        selectedDates: [null, null],
      });

      const expectedStartDate = normalizeDate(new Date('2017-03-25'));

      const startRangeOption = wrapper.find('[data-date="2017-03-25"]');
      startRangeOption.simulate('click');
      expect(startRangeOption.props().className.includes('ui-calendar-days-option_selected-start')).toEqual(true);
      expect(wrapper.state().minLimit).toEqual(expectedStartDate);
      expect(wrapper.state().selectedDates[0]).toEqual(expectedStartDate);
      expect(wrapper.find('[data-date="2017-03-24"]').props().disabled).toEqual(true);

      const expectedEndDate = new Date('2017-03-29');
      expectedEndDate.setHours(0);
      expectedEndDate.setMinutes(0);
      expectedEndDate.setSeconds(0);
      expectedEndDate.setMilliseconds(0);

      // Selects the end date on the 2nd click
      const endRangeOption = wrapper.find('[data-date="2017-03-29"]');
      endRangeOption.simulate('click');

      const betweenRangeOption = wrapper.find('[data-date="2017-03-28"]');

      expect(endRangeOption.props().className.includes('ui-calendar-days-option_selected-end')).toEqual(true);
      expect(wrapper.state().selectedDates[1]).toEqual(expectedEndDate);
      expect(betweenRangeOption.props().className.includes('ui-calendar-days-option_selected-between')).toEqual(true);

      // On 3rd click resets the calendar, removing the selection
      betweenRangeOption.simulate('click');
      expect(wrapper.state().minLimit).toEqual(null);
      expect(wrapper.state().selectedDates).toEqual([null, null]);
    });

    it('should render the selection as normal (not range) when start and end date are the same', () => {
      const expectedEndDate = normalizeDate(new Date('2017-03-25'));
      const expectedStartDate = normalizeDate(new Date('2017-03-25'));
      const wrapper = mount(
        <Calendar selectionType="range" />
      );

      const startRangeOption = wrapper.find('[data-date="2017-03-25"]');
      startRangeOption.simulate('click');
      expect(startRangeOption.props().className.includes('ui-calendar-days-option_selected-start')).toEqual(true);
      expect(wrapper.state().minLimit).toEqual(expectedStartDate);
      expect(wrapper.state().selectedDates[0]).toEqual(expectedStartDate);

      // Selects the end date on the 2nd click
      const endRangeOption = wrapper.find('[data-date="2017-03-25"]');
      endRangeOption.simulate('click');

      expect(endRangeOption.props().className.includes('ui-calendar-days-option_selected')).toEqual(true);
      expect(wrapper.state().minLimit).toEqual(null);
      expect(wrapper.state().selectedDates[1]).toEqual(expectedEndDate);
    });

    it('should put the minLimit back to the one passed on props, when resetting it', () => {
      const expectedEndDate = normalizeDate(new Date('2017-03-25'));
      const expectedStartDate = normalizeDate(new Date('2017-03-25'));
      const minDate = '2017-03-05';
      const expectedInitialMinLimit = normalizeDate(new Date(minDate));

      const wrapper = mount(
        <Calendar minDate={minDate} selectionType="range" />
      );

      expect(wrapper.state().minLimit).toEqual(expectedInitialMinLimit);

      const startRangeOption = wrapper.find('[data-date="2017-03-25"]');
      startRangeOption.simulate('click');
      expect(startRangeOption.props().className.includes('ui-calendar-days-option_selected-start')).toEqual(true);
      expect(wrapper.state().minLimit).toEqual(expectedStartDate);
      expect(wrapper.state().selectedDates[0]).toEqual(expectedStartDate);

      // Selects the end date on the 2nd click
      const endRangeOption = wrapper.find('[data-date="2017-03-25"]');
      endRangeOption.simulate('click');

      expect(endRangeOption.props().className.includes('ui-calendar-days-option_selected')).toEqual(true);
      expect(wrapper.state().minLimit).toEqual(expectedInitialMinLimit);
      expect(wrapper.state().selectedDates[1]).toEqual(expectedEndDate);

      // And resets the dates with the 3rd click
      wrapper.find('[data-date="2017-03-26"]').simulate('click');
      expect(wrapper.state().minLimit).toEqual(expectedInitialMinLimit);
      expect(wrapper.state().selectedDates).toEqual([null, null]);
    });
  });
});
