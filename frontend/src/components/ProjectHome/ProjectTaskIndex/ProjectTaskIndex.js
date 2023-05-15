import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as projectActions from '../../../store/project';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { formatDate } from '../../../store/util';
import './ProjectTaskIndex.css';

function ProjectTaskIndex() {
  const {projectId} = useParams();
  const [allTasks,setAllTasks] = useState([]);
  const project = useSelector(projectActions.getProject(projectId));

  useEffect(()=>{
    if(project){
        setAllTasks(project.tasks);
      }
  },[project,setAllTasks])

  return (
    <div className="user-project-index">
      <table className="task-table">
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Task Description</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {allTasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{formatDate(task.startDate)}</td>
              <td>{formatDate(task.endDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTaskIndex;
