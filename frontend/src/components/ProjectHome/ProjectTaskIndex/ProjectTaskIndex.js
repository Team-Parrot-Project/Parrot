import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as projectActions from '../../../store/project';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { formatDate } from '../../../store/util';
import TaskUpdateModal from '../../Task_CRUD/TaskUpdateForm';
import DeleteTaskModal from '../../Task_CRUD/TaskDelete/TaskDelete';
import './ProjectTaskIndex.css';

function ProjectTaskIndex() {
  const {projectId} = useParams();
  const [allTasks,setAllTasks] = useState([]);
  const project = useSelector(projectActions.getProject(projectId));

  useEffect(()=>{
    if(project){
        setAllTasks(project.tasks);
      }
      console.log(allTasks, "tasks");
  },[project, setAllTasks, allTasks])

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
              <TaskUpdateModal taskId={task._id} projectId={project._id} />
              <DeleteTaskModal  taskId={task._id} projectId={project._id} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTaskIndex;
