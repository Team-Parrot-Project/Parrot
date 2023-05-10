import React from 'react';
import { useDispatch } from 'react-redux';
import { setTimeframe } from '../../../store/timeframeActions';
import './FilterBar.css'

export default function FilterBar() {

  const dispatch = useDispatch();

  const handleTimeframeChange = (event) => {
    const selectedTimeframe = event.target.value;
    dispatch(setTimeframe(selectedTimeframe));
  };


  return (
    <>
      <div className="gantt-filter-bar">
        <div className="gantt-filter-group">
          <label className="gantt-filter-group-title">Task:</label>
          <input type="text" id="gantt-task-filter" />
        </div>
        <div className="gantt-filter-group">
          <label className="gantt-filter-group-title">Project:</label>
          <input type="text" id="gantt-project-filter" />
        </div>
        <div className="gantt-filter-group">
          <label className="gantt-filter-group-title">User:</label>
          <input type="text" id="gantt-user-filter" />
        </div>
        <div className="gantt-filter-group">
          <label className="gantt-filter-group-title">Timeframe:</label>
          <select id="gantt-timeframe-filter" onChange={handleTimeframeChange}>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month" selected>Month</option>
          </select>
        </div>
      </div>
    </>
  );
};
