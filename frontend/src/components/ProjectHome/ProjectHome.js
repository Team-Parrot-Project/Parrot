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
import ProjectUpdateModal from '../Project_CRUD/ProjectUpdateForm/';
import DeleteProjectModal from '../Project_CRUD/ProjectDelete/ProjectDeleteModal';
import { formatDate } from '../../store/util';

export default function ProjectHome () {
  const dispatch = useDispatch();
  const {projectId} = useParams();
  const [recommendedTasks, setRecommendedTasks] = useState([]);
  const project = useSelector((state) => state.projects[projectId]);

    useEffect(() => {
        dispatch(taskActions.purgeTasks());
        dispatch(projectActions.fetchProject(projectId));
    }, [projectId, dispatch]);

    return (
      <>
      <div className="project-home-wrapper">
        <NavBar/>
      <div className="centered-container">
        <h1 className="project-home-table-title">Project: {project?.title}</h1>
        <h2 className="project-home-table-title">Description: {project?.description}</h2>
        <h3 className="project-home-table-title">Start Date: {formatDate(project?.startDate)}</h3>
        <h3 className="project-home-table-title">End Date: {formatDate(project?.endDate)}</h3>

        <ProjectUpdateModal />
        <ProjectTaskIndex/>
        <DeleteProjectModal />
        <TaskRecommendation project={project} recommendedTasks={recommendedTasks} setRecommendedTasks={setRecommendedTasks}/>
        <div className="task-create-forms">
          {recommendedTasks.length > 0 && recommendedTasks.map((taskTitle) => (
            <TaskCreateForm key={taskTitle} taskTitle={taskTitle} />
          ))}
          <TaskCreateForm />
        </div>
      </div>
      </div>
      </>
    );
}
