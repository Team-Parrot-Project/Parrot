import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CurrentDate from './Date/Date';
import UserGreeting from './UserGreeting/UserGreeting';
import './Dashboard.css';
import UserProjectIndex from '../../Project_CRUD/UserProjectIndex/UserProjectIndex';
import UserTaskIndex from '../../Task_CRUD/UserTaskIndex/UserTaskIndex';
import ProjectCreateModal from '../../Project_CRUD/ProjectCreateForm/index';
import { Tooltip } from 'react-tooltip'
import { fetchUsers } from '../../../store/user';

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // grabs all the project collaborators from state
  const projects = useSelector(state => state.projects);

  const totalCollaborators = Object.keys(projects).reduce((count, projectId) => {
    const project = projects[projectId];
    return count + project.collaborators.length;
  }, 0);

  // grabs all completed tasks from state
  const tasks = useSelector(state => state.tasks);
  const completedTasks = Object.keys(tasks).reduce((count, taskId) => {
    const task = tasks[taskId];
    if (task.status === 'completed') {
      return count + 1;
    }
    return count;
  }, 0);

  return (
    <>
      <div className="user-dashboard-wrapper">
        <div className="user-dashboard-main-content">

          <header className="user-dashboard-header">
            <div className="user-dashboard-header-content">
              <h2 className="user-dashboard-date"><CurrentDate /></h2>
              <h1 className="user-dashboard-greeting"><UserGreeting /></h1>
            </div>
          </header>

          <div className="dropdown-container">

            <div className="parent-user-dashboard-widget-select-date-container">
              <div className="child-user-dashboard-widget-select-date-container">
                <div className="parent-user-dashboard-widget-select-date-container">
                  <div className="child-user-dashboard-widget-select-date-container">
                    <div className="dashboard-widget">
                      <div>my week</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="user-dashboard-widget-divider"></div>

            <div className="parent-user-dashboard-project-task-stats">
              <div className="child-user-dashboard-project-task-stats">
                <div className="user-dashboard-project-task-number-container"><svg
                  className="user-dashboard-project-task-number-check-icon" viewBox="0 0 32 32">
                  <path
                    d="M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l5.4,5.4l16-15.9c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z">
                  </path>
                </svg>
                  <div className="parent-user-dashboard-project-task-number-ticker-container">
                    <div className="child-user-dashboard-project-task-number-ticker-container">
                      <h4
                        className="user-dashboard-project-task-number-ticker">
                        {completedTasks}</h4>
                    </div>
                  </div>
                </div><span className="user-dashboard-project-quick-stats-title">tasks completed</span>
              </div>
            </div>

            <div className="parent-user-dashboard-project-task-stats">
              <div className="child-user-dashboard-project-task-stats">
                <div className="user-dashboard-project-task-number-container"><svg className="user-dashboard-project-task-number-check-icon" viewBox="0 0 32 32">
                  <path d="M21,18c-4.411,0-8-3.589-8-8S16.589,2,21,2s8,3.589,8,8-3.589,8-8,8Zm0-14c-3.309,0-6,2.691-6,6s2.691,6,6,6,6-2.691,6-6-2.691-6-6-6Zm11,25v-2c0-3.86-3.141-7-7-7h-8c-3.859,0-7,3.14-7,7v2c0,.552,.447,1,1,1s1-.448,1-1v-2c0-2.757,2.243-5,5-5h8c2.757,0,5,2.243,5,5v2c0,.552,.447,1,1,1s1-.448,1-1ZM12,17c0-.552-.447-1-1-1-3.309,0-6-2.691-6-6s2.691-6,6-6c.553,0,1-.448,1-1s-.447-1-1-1C6.589,2,3,5.589,3,10s3.589,8,8,8c.553,0,1-.448,1-1ZM2,29v-2c0-2.757,2.243-5,5-5h2c.553,0,1-.448,1-1s-.447-1-1-1h-2C3.141,20,0,23.14,0,27v2C0,29.552,.447,30,1,30s1-.448,1-1Z">
                  </path>
                </svg>
                  <div className="parent-user-dashboard-project-task-number-ticker-container">
                    <div className="child-user-dashboard-project-task-number-ticker-container">
                      <h4
                        className="user-dashboard-project-task-number-ticker">
                        {totalCollaborators}</h4>
                    </div>
                  </div>
                </div><span className="user-dashboard-project-quick-stats-title">collaborators</span>
              </div>
            </div>

          </div>

        </div>

        <div className="user-dashboard-project-task-container">
          <div className="user-dashboard-tasks-container">
            <h2 className="user-dashboard-project-task-container-title-x">Your Tasks</h2>

            <div className="task-selection">
              <UserTaskIndex projects={projects}/>
            </div>

            <div className="task-list">

            </div>
          </div>
          <div className="user-dashboard-projects-container" data-tooltip-id="clickAProjectToView">
            <div className='project-plus-button'>
              <ProjectCreateModal />
            </div>
            <h2 className="user-dashboard-project-task-container-title-x">Projects</h2>
            <div className='project-list'>
              <UserProjectIndex />
            </div>
          </div>
          <Tooltip id="clickAProjectToView" effect="solid" place="top">
                Click on a project to view more details
          </Tooltip>
        </div>
      </div >

    </>

  )
}
