import React from 'react';
import NavBar from '../NavBar/NavBar';
import Dashboard from './Dashboard/Dashboard';
import './UserHome.css';

export default function UserHome () {


    return (
      <>
      <div className="user-home-wrapper">
        <NavBar />
        <Dashboard/>
      </div>
      </>
    );
}
