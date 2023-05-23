import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import FilterBar from './FilterBar/FilterBar';
import GanttChart from './GanttChart/GanttChart';
import './Timeline.css';
import { logout } from '../../store/session';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { updateProject } from '../../store/project';
import { useDispatch, useSelector } from 'react-redux';

export default function Timeline() {

  const loggedIn = useSelector(state => !!state.session.user);

  const dispatch = useDispatch();
  const [updatedTasks, setUpdatedTasks] = useState({})
  const [taskUpdatesProcessed, setTaskUpatesProcessed] = useState(false);
  const [taskUpdateRuns, setTaskUpdateRuns] = useState(0);
  const { projectId } = useParams()

  function timelineLogOut(e) {
    e.preventDefault();
    setTaskUpdateRuns((prev) => { return -10 });
  }

  useEffect(() => {
    debugger;
    if (taskUpdateRuns === 1) {
      patchTaskChanges()
    } else if (taskUpdateRuns === -10) {
      patchTaskChanges().then(() => { dispatch(logout()) })
    }
  }, [taskUpdateRuns])

  async function patchTaskChanges() {
    const updatedTasksFromTimeline = {
      id: projectId,
      tasks: Object.values(updatedTasks)
    }
    dispatch(updateProject(updatedTasksFromTimeline))
  }

  return (
    <>
      <div className="timeline-wrapper">
        <NavBar timelineLogOut={timelineLogOut} />
        <div className="gantt-chart-wrapper">
          <FilterBar />
          <GanttChart updatedTasks={updatedTasks} setUpdatedTasks={setUpdatedTasks}
            patchTaskChanges={patchTaskChanges}
            setTaskUpdateRuns={setTaskUpdateRuns}
          />
        </div>
      </div>
    </>
  )

}
