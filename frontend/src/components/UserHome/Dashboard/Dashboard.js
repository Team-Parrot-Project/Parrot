import React from 'react';
import { useSelector } from 'react-redux';
import CurrentDate from './Date/Date';
import UserGreeting from './UserGreeting/UserGreeting';
import './Dashboard.css';

export default function Dashboard() {

  const userName = useSelector(state => state.session.user.userName);

  return (


    <>

      <div className="user-dashboard-wrapper">
        <div className="user-dashboard-main-content">

          <header className="user-dashboard-header">
            <div className="user-dashboard-header-content">
              <h2 className="user-dashboard-date"><CurrentDate /></h2>
              {/* <h1 className="user-dashboard-greeting"><UserGreeting userName={userName} /></h1> */}
            </div>
          </header>



          <div className="dropdown-container">

            <div className="parent-user-dashboard-widget-select-date-container">
              <div className="child-user-dashboard-widget-select-date-container" role="button" tabIndex="0">
                <span className="user-dashboard-widget-select-date">My week

                </span>
                <svg className="user-dashboard-widget-select-date-icon" viewBox="0 0 24 24">
                  <path
                    d="M3.5,8.9c0-0.4,0.1-0.7,0.4-1C4.5,7.3,5.4,7.2,6,7.8l5.8,5.2l6.1-5.2C18.5,7.3,19.5,7.3,20,8c0.6,0.6,0.5,1.5-0.1,2.1 l-7.1,6.1c-0.6,0.5-1.4,0.5-2,0L4,10.1C3.6,9.8,3.5,9.4,3.5,8.9z">
                  </path>
                </svg>
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
                        0</h4>
                    </div>
                  </div>
                </div><span className="user-dashboard-project-quick-stats-title">tasks completed</span>
              </div>
            </div>
          </div>

          {/* <div className="user-dashboard-project-quick-stats">
              <p className="user-dashboard-project-quick-stats-title">Tasks completed: <span>5</span></p>
              <p className="user-dashboard-project-quick-stats-title">Collaborators: <span>3</span></p>
            </div> */}

        </div>

        <div className="user-dashboard-project-task-container">
          <div className="user-dashboard-tasks-container">
            <h2 className="user-dashboard-project-task-container-title-x">Tasks</h2>

            <div className="task-selection">
              <h3 className="task-status" >Upcoming</h3>
              <h3 className="task-status" >Overdue</h3>
              <h3 className="task-status" >Completed</h3>
            </div>

            <div className="task-list">

            </div>
          </div>
          <div className="user-dashboard-projects-container">
            <h2 className="user-dashboard-project-task-container-title-x">Projects</h2>

          </div>
        </div>
      </div>

    </>


  )
}
