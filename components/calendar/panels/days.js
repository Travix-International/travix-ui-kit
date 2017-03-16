import React from 'react';
import DaysView from '../views/days';

export default function Days(props) {
  return <div className="ui-calendar-days-panel"><DaysView {...props} /></div>;
}
