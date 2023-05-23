import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProject, updateProject } from '../../../store/project';
import { fetchUser } from '../../../store/user';
import { formatDate } from '../../../store/util';
import Gantt from 'frappe-gantt';
import './GanttChart.css';

export default function GanttChart({ updatedTasks, setUpdatedTasks, patchTaskChanges }) {

  // Live updates multiple dependencies

  // const [updatedTasks, setUpdatedTasks] = useState({})
  const [tasksUpdated, setTasksUpdated] = useState(false);

  // The useRef and useMemo are needed otherwise the chart would not render properly on first load and or would cause inifinte rerenders.

  const { projectId } = useParams()
  const dispatch = useDispatch()
  const time = useSelector(state => state.timeframe.selectedTimeframe);
  const userId = useSelector(state => state.session.user._id);
  const formattedTime = useMemo(() => time ? time.charAt(0).toUpperCase() + time.slice(1) : null, [time]);

  // Used to create a dummy ref for the chart before it exisits
  const ganttRef = useRef();

  // Grab the project from state
  const projectTasks = useSelector(state => state.projects);

  // Reformate the tasks data for the Gantt chart
  const formattedTasks = useMemo(() => {
    if (projectTasks[projectId]?.tasks) {

      return projectTasks[projectId].tasks.map((task, index) => {
        const sDate = task.startDate ? formatDate(task.startDate) : '';
        const eDate = task.endDate ? formatDate(task.endDate) : '';

        return {
          id: task._id,
          name: task.title,
          start: sDate,
          end: eDate,
          progress: task.progress,
          dependencies: task.blockingTasks
        };
      })
    } else {
      return [];
    }
  }, [projectTasks, projectId]);

  useEffect(() => {

    // Add the project to state
    dispatch(fetchProject(projectId))
    dispatch(fetchUser(userId))

  }, [dispatch, projectId, userId]);

  // ----------------------------------------------------------------------------------------------------------

  // Generate the Gantt chart
  useEffect(() => {

    if (ganttRef.current && formattedTasks.length && formattedTime) {
      new Gantt("#gantt", formattedTasks, {
        header_height: 50,
        column_width: 30,
        step: 24,
        view_modes: ['Day', 'Week', 'Month'], // this is also a 'Quarter Day', 'Half Day' but they can't render properly
        bar_height: 20,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 18,
        view_mode: formattedTime,
        date_format: 'YYYY-MM-DD',
        language: 'en', // or 'es', 'it', 'ru', 'ptBr', 'fr', 'tr', 'zh', 'de', 'hu'
        custom_popup_html: null,
        on_date_change: function (task, start, end) {
          // this is the event handler for all the dragging of tasks to update dates in the database
          setUpdatedTasks((prev) => {
            prev[task.id] = { ...prev[task.id], startDate: start, endDate: end, _id: task.id }
            return prev;
          })
        },
        on_progress_change: function (task, progress) {
          // this is the event handler for all the dragging of tasks progress to the database
          setUpdatedTasks((prev) => {
            prev[task.id] = { ...prev[task.id], progress, _id: task.id }
            return prev;
          })
        }
      });
    }
  }, [ganttRef, formattedTasks, formattedTime])

  // this use effect fires when the user refreshes the page to ensure their changes are saved
  useEffect(() => {
    let unloaded = false;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      patchTaskChanges();
      unloaded = true;
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      if (!unloaded) {
        patchTaskChanges();
      }
    }
  }, [])

  return (

    <>
      <svg id="gantt" className="gantt" ref={ganttRef}></svg>
    </>

  )

}
