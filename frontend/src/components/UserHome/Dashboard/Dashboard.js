import React from 'react';
import './Dashboard.css';

export default function Dashboard() {


  return (


    <>

      <div className="user-dashboard-wrapper">
        <div className="main-content">
          <header>
            <div className="header-content">
              <h2>Sunday, May 7</h2>
              <h1>Good evening, Christopher</h1>
            </div>
          </header>
          <div className="dropdown-container">
            <select>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
            <div className="stats">
              <p>Tasks completed: <span>5</span></p>
              <p>Collaborators: <span>3</span></p>
            </div>
          </div>
          <div className="content">
            <div className="tasks">
              <h2>Tasks</h2>

            </div>
            <div className="projects">
              <h2>Projects</h2>

            </div>
          </div>
        </div>
      </div>

    </>


  )
}
