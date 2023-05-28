import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTimeframe, setProjectId } from '../../../store/timeframeActions';
import { getProject } from '../../../store/project';
import './FilterBar.css'

export default function FilterBar() {
  const { projectId } = useParams()
  const dispatch = useDispatch();
  const projects = useSelector(state => state.projects);
  const [project, setProject] = useState();
  const [projectList, setProjectList] = useState([]);
  // const project = useSelector(getProject(projectId));

  useEffect(() => {
    if(projects) {
      setProject(projects[projectId]);
      const sortedProjects = Object.values(projects).sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      setProjectList(sortedProjects);
    }
  }, [projects, projectId])

  const handleTimeframeChange = (event) => {
    const selectedTimeframe = event.target.value;
    dispatch(setTimeframe(selectedTimeframe));
  };

  const handleProjectIdChange = (event) => {
    const selectedProjectId = event.target.value;
    dispatch(setProjectId(selectedProjectId));
    const projectLink = `/projects/${selectedProjectId}/timeline`;
    window.location.href = projectLink;
  }

  return (
    <>
      <div className="gantt-filter-bar">
        <h1 className="timeline-project-title">{project?.title}</h1>
        <div className="gantt-filter-group">
          <label className="gantt-filter-group-title">Project:</label>
          <select className="gantt-filter-select" onChange={handleProjectIdChange} value={projectId}>
            {projectList.map((project) => (
              <option key={project._id} value={project._id}>
                {`${project.title}`}
              </option>
            ))}
          </select>
        </div>
        <div className="gantt-filter-group">
          <label className="gantt-filter-group-title">Timeframe:</label>
          <select className="gantt-filter-select" defaultValue="week" id="gantt-timeframe-filter" onChange={handleTimeframeChange}>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
        <div className="gantt-chart-instructions-container">
          <div className="gantt-chart-instructions-label">Instructions</div>
          <div className="gantt-chart-instructions-item">Drag tasks across the timeline to adjust dates</div>
          <div className="gantt-chart-instructions-item">Resize bars to change duration</div>
          <div className="gantt-chart-instructions-item">Drag the blue slider in the middle to adjust progress</div>
          <div className="gantt-chart-instructions-item">Click a task to view more information</div>
        </div>
      </div>
    </>
  );
};
