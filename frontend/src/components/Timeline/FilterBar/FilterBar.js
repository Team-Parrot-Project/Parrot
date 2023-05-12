import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTimeframe, setProjectId } from '../../../store/timeframeActions';
import { getProject } from '../../../store/project';
import './FilterBar.css'

export default function FilterBar() {
  const { projectId } = useParams()
  const project = useSelector(getProject(projectId));
  const dispatch = useDispatch();
  const projects = useSelector(state => state.projects);

  const handleTimeframeChange = (event) => {
    const selectedTimeframe = event.target.value;
    dispatch(setTimeframe(selectedTimeframe));
  };

  const handleProjectIdChange = (event) => {
    const selectedProjectId = event.target.value;
    dispatch(setProjectId(selectedProjectId));
  }

  return (
    <>
      <div className="gantt-filter-bar">
        <h1 className="timeline-project-title">{project?.title}</h1>
        <div className="gantt-filter-group">
          <label className="gantt-filter-group-title">Project:</label>
          <select onChange={handleProjectIdChange}>
            {Object.keys(projects).map((projectId) => (
              <option key={projectId} value={projects[projectId]._id}>
                {projects[projectId].title}
              </option>
            ))}
          </select>
        </div>
        <div className="gantt-filter-group">
          <label className="gantt-filter-group-title">Timeframe:</label>
          <select defaultValue="week" id="gantt-timeframe-filter" onChange={handleTimeframeChange}>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
      </div>
    </>
  );
};
