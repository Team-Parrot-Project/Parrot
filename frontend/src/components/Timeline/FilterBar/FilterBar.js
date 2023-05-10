import React from 'react';
import './FilterBar.css'

export default function FilterBar() {
  return (
    <>
      <div className="gantt-filter-bar">
        <div className="gantt-filter-group">
          <label htmlFor="gantt-task-filter">Task:</label>
          <input type="text" id="gantt-task-filter" />
        </div>
        <div className="gantt-filter-group">
          <label htmlFor="project-filter">Project:</label>
          <input type="text" id="gantt-project-filter" />
        </div>
        <div className="gantt-filter-group">
          <label htmlFor="user-filter">User:</label>
          <input type="text" id="gantt-user-filter" />
        </div>
        <div className="gantt-filter-group">
          <label htmlFor="timeframe-filter">Timeframe:</label>
          <input type="text" id="gantt-timeframe-filter" />
        </div>
      </div>
    </>
  );
};
