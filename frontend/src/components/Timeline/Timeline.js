import React from 'react';
import NavBar from '../NavBar/NavBar';
import FilterBar from './FilterBar/FilterBar';
import GanttChart from './GanttChart/GanttChart';
import './Timeline.css';

export default function Timeline() {


  return (
    <>
      <div className="timeline-wrapper">
        <NavBar />
        <div className="gantt-chart-wrapper">
          <FilterBar />
          <GanttChart />
        </div>
      </div>
    </>
  )

}
