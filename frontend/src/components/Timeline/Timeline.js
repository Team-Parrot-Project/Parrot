import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import FilterBar from './FilterBar/FilterBar';
import GanttChart from './GanttChart/GanttChart';
import './Timeline.css';
import { logout } from '../../store/session';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { updateProject } from '../../store/project';
import { useDispatch } from 'react-redux';

export default function Timeline() {

  const dispatch = useDispatch();
  const [updatedTasks, setUpdatedTasks] = useState({})
  const [taskUpdateRuns, setTaskUpdateRuns] = useState(0);
  const { projectId } = useParams()

  function handleBeforeUnload(e) {
    e.preventDefault();
    patchTaskChanges();
  }

  useEffect(() => {

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      patchTaskChanges();
    }
  }, [])

  function timelineLogOut(e) {
    e.preventDefault();
    patchTaskChanges()
      .then(() => {
        return window.removeEventListener('beforeunload', handleBeforeUnload);
      })
      .then(() => { return dispatch(logout()) })
  }

  // this will only check for start and end date
  async function patchTaskChanges() {

    // only run if the user is logged in
    if (localStorage.getItem('jwtToken')) {
      const allTasks = Object.values(updatedTasks);

      // only run if  there are actually tasks to be updated
      if (allTasks.length > 0) {
        const updatedTasksFromTimeline = {
          id: projectId,
          tasks: allTasks
        }
        dispatch(updateProject(updatedTasksFromTimeline))
      }
    }
  }

  return (
    <>
      <div className="timeline-wrapper">
        <NavBar timelineLogOut={timelineLogOut} />
        <div className="gantt-chart-wrapper">
          <FilterBar />
          <GanttChart updatedTasks={updatedTasks} setUpdatedTasks={setUpdatedTasks}
            setTaskUpdateRuns={setTaskUpdateRuns}
          />
        </div>
      </div>
    </>
  )

}
