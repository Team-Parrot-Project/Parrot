import React, { useEffect, useState } from 'react';
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

  // useEffect(()=>{
  //   if(project){
  //     setProjectId(project._id)]
  //     console.log(projectId,"projectId")
  //   }
  // },[project,projectId, setProjectId])


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
  console.log(Object.values(projects), "projects")
  function logIt (log){
    console.log(project)}

  return (
    <>
      <div className="gantt-filter-bar">
        <h1 className="timeline-project-title">{project?.title}</h1>
        <div className="gantt-filter-group">
          <label className="gantt-filter-group-title">Project:</label>
          <select onChange={handleProjectIdChange} defaultValue={projectId}>
            {Object.values(projects).map((project) => (
              <option key={project._id} value={project._id} selected={(projectId === project._id)}>
                {`${project.title}`}
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
