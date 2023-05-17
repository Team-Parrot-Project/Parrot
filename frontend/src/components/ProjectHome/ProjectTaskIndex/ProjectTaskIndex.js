import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as projectActions from '../../../store/project';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { formatDate } from '../../../store/util';
import TaskUpdateModal from '../../Task_CRUD/TaskUpdateForm';
import DeleteTaskModal from '../../Task_CRUD/TaskDelete/TaskDelete';
import './ProjectTaskIndex.css';
import { fetchProject } from '../../../store/project';
import { getProject } from '../../../store/project';

function ProjectTaskIndex() {
  const {projectId} = useParams();
  // const [allTasks,setAllTasks] = useState([]);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchProject(projectId))
  }, [dispatch, projectId])
  
  const project = useSelector(projectActions.getProject(projectId));
  const allTasks = useSelector(projectActions.getProjectTasks(projectId));

  // useEffect(()=>{
  //   if(project){
  //       setAllTasks(project.tasks);
  //     }
  //     console.log(allTasks, "tasks");
  // },[project, setAllTasks, allTasks])

  // function mapTasks() {
  //   if(project && project.tasks) {
  //     let allTasks = project.tasks;
  //     return (
  //       <>
        
  //     </>)
  //   }
  // }

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
