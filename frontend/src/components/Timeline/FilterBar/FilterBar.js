import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTimeframe } from '../../../store/timeframeActions';
import { getProject } from '../../../store/project';
import './FilterBar.css'

export default function FilterBar() {
  const { projectId } = useParams()
  const project = useSelector(getProject(projectId));
  const dispatch = useDispatch();

  const handleTimeframeChange = (event) => {
    const selectedTimeframe = event.target.value;
    dispatch(setTimeframe(selectedTimeframe));
  };

  if (project) console.log(project.title)

  return (
    <>
      <div className="gantt-filter-bar">
        <h1 className="timeline-project-title">{project?.title}</h1>
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
          <select defaultValue="month" id="gantt-timeframe-filter" onChange={handleTimeframeChange}>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
      </div>
    </>
  );
};
