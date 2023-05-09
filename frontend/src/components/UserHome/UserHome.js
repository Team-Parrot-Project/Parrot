import React from 'react';
import NavBar from '../NavBar/NavBar';
import Dashboard from './Dashboard/Dashboard';
import ProjectCreateForm from "./ProjectCreateForm/ProjectCreateForm";
import TaskCreateForm from "./TaskCreateForm/TaskCreateForm";
import './UserHome.css';

export default function UserHome () {



    return (
      <>
      <div className="user-home-wrapper">
        <NavBar />
        <Dashboard/>
        {/* <ProjectCreateForm />
        <TaskCreateForm /> */}
      </div>
      </>
    );
}
