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
import TaskCreateModal from '../Task_CRUD/TaskCreateForm/';
import ProjectUpdateModal from '../Project_CRUD/ProjectUpdateForm/';
import DeleteProjectModal from '../Project_CRUD/ProjectDelete/ProjectDeleteModal';
import { formatDate } from '../../store/util';
import { fetchUsers } from '../../store/user';

export default function ProjectHome () {
  const dispatch = useDispatch();
  const {projectId} = useParams();
  const [recommendedTasks, setRecommendedTasks] = useState([]);
  const project = useSelector((state) => state.projects[projectId]);

  useEffect(() => {
      dispatch(taskActions.purgeTasks());
      dispatch(projectActions.fetchProject(projectId));
      dispatch(fetchUsers())
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
        <TaskCreateModal />
        <ProjectTaskIndex/>
        <DeleteProjectModal />
        <TaskRecommendation project={project} recommendedTasks={recommendedTasks} setRecommendedTasks={setRecommendedTasks}/>
        <div className="task-create-forms">
          {recommendedTasks.length > 0 && recommendedTasks.map((taskTitle) => (
            <TaskCreateForm key={taskTitle} taskTitle={taskTitle} />
          ))}
        </div>
      </div>
      </div>
      </>
    );
}
