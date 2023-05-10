import React from 'react';
import NavBar from '../NavBar/NavBar';
import './ProjectHome.css';
import Notifications from '../Notifications/Notifications';
import { useDispatch } from 'react-redux';
import ProjectTaskIndex from './ProjectTaskIndex/ProjectTaskIndex';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import * as projectActions from '../../store/project';
import { useEffect } from 'react';
import * as taskActions from '../../store/task';

export default function ProjectHome () {
    const dispatch = useDispatch();
    const {projectId} = useParams();
    
    useEffect(() => {
        dispatch(taskActions.purgeTasks());
        dispatch(projectActions.fetchProject(projectId));
    }, [projectId, dispatch]);

    return (
      <>
      <div className="project-home-wrapper">
        <NavBar/>
      <div>
        <ProjectTaskIndex/>
      </div>
      </div>
      </>
    );
}
