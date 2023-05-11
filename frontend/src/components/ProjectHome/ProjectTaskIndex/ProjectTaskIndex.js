import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProjectTaskIndex.css';
import * as taskActions from '../../../store/task';
import { selectUser } from '../../../store/session';
import * as projectActions from '../../../store/project';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

function ProjectTaskIndex() {
  const allTasks = useSelector(taskActions.getTasks);

  return (
    <div className="user-project-index">
      <h2>Project Tasks</h2>
      <ul>
        {allTasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              Start Date: {task.startDate} <br></br>| End Date: {task.endDate} <br></br>
            </p>
            <br></br>
          </li> 
        ))}
      </ul>
    </div>
  );
}

export default ProjectTaskIndex;
