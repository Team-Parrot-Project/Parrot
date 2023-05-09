import React from 'react';
import CurrentDate from './Date/Date';
import './Dashboard.css';

export default function Dashboard() {


  return (


    <>

      <div className="user-dashboard-wrapper">
        <div className="user-dashboard-main-content">
          <header className="user-dashboard-header">
            <div className="user-dashboard-header-content">
              <h2 className="user-dashboard-date"><CurrentDate /></h2>
              <h1 className="user-dashboard-greeting">Good evening, Christopher</h1>
            </div>
          </header>
          <div className="dropdown-container">
            <select>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
            <div className="user-dashboard-project-quick-stats">
              <p className="user-dashboard-project-quick-stats-title">Tasks completed: <span>5</span></p>
              <p className="user-dashboard-project-quick-stats-title">Collaborators: <span>3</span></p>
            </div>
          </div>
          <div className="user-dashboard-project-task-container">
            <div className="user-dashboard-tasks-container">
              <h2 className="user-dashboard-project-task-container-title">Tasks</h2>

            </div>
            <div className="user-dashboard-projects-container">
              <h2 className="user-dashboard-project-task-container-title">Projects</h2>

            </div>
          </div>
        </div>
      </div>

    </>


  )
}
