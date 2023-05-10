import React from 'react';
import NavBar from '../NavBar/NavBar';
import GanttChart from './GanttChart/GanttChart';
import './Timeline.css';

export default function Timeline() {


  return (

    <>
    <div className="timeline-wrapper">
      <NavBar/>
      <GanttChart/>
    </div>
    </>
  )

}
