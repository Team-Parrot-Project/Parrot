import React from 'react';
import NavBar from '../NavBar/NavBar';
import './ProjectHome.css';
import Notifications from '../Notifications/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import ProjectTaskIndex from './ProjectTaskIndex/ProjectTaskIndex';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import * as projectActions from '../../store/project';
import { useEffect, useState } from 'react';
import * as taskActions from '../../store/task';
import TaskRecommendation from '../UserHome/TaskRecommendation/TaskRecommendation';
import TaskCreateForm from '../Task_CRUD/TaskCreateForm/TaskCreateForm';


export default function ProjectHome () {
  const dispatch = useDispatch();
  const {projectId} = useParams();
  const [recommendedTasks, setRecommendedTasks] = useState([]);
  const project = useSelector((state) => state.projects.last);
  console.log(project);
    
    useEffect(() => {
        dispatch(taskActions.purgeTasks());
        dispatch(projectActions.fetchProject(projectId));
    }, [projectId, dispatch]);

    return (
      <>
      <div className="project-home-wrapper">
        <NavBar/>
      <div>
        <p>{project?.title}</p>
        <ProjectTaskIndex/>
        <p>Click below to generate recommended tasks based on the project title and description utilizing the Open AI API: </p>
        <TaskRecommendation project={project} recommendedTasks={recommendedTasks} setRecommendedTasks={setRecommendedTasks}/>
        {recommendedTasks.length > 0 && recommendedTasks.map((taskTitle) => (
          <TaskCreateForm key={taskTitle} taskTitle={taskTitle} />
        ))}
        <TaskCreateForm />
      </div>
      </div>
      </>
    );
}
