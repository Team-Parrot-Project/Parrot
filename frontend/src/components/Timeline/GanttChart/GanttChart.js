import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask } from '../../../store/task';
import { fetchProject } from '../../../store/project';
import { fetchUser } from '../../../store/user';
import { formatDate } from '../../../store/util';
import { debounce } from 'lodash';
import Gantt from 'frappe-gantt';
import './GanttChart.css';

export default function GanttChart() {
  // Live updates multiple dependencies
  const [updatedTasks, setUpdatedTasks] = useState([])
  const [tasksProcessing, setTasksProcessing] = useState(0);

  const { projectId } = useParams()
  const dispatch = useDispatch()
  const time = useSelector(state => state.timeframe.selectedTimeframe);
  const userId = useSelector(state => state.session.user._id);
  const formattedTime = useMemo(() => time ? time.charAt(0).toUpperCase() + time.slice(1) : null, [time]);

  // The useRef and useMemo are needed otherwise the chart would not render properly on first load and or would cause inifinte rerenders.

  // Grab the project from state
  const projectTasks = useSelector(state => state.projects);

  // Reformate the tasks data for the Gantt chart
  const formattedTasks = useMemo(() => {
    if (projectTasks[projectId]?.tasks) {

      // initializeTasks(projectTasks[projectId].tasks);
      return projectTasks[projectId].tasks.map((task, index) => {
        const sDate = task.startDate ? formatDate(task.startDate) : '';
        const eDate = task.endDate ? formatDate(task.endDate) : '';

        return {
          id: task._id,
          name: task.title,
          start: sDate,
          end: eDate,
          progress: task.progress,
          dependencies: task.blockingTasks //task.blockingTasks
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

  // Used to create a dummy ref for the chart before it exisits
  const ganttRef = useRef();

  // Handles live date update on dragging and is throttled. Even though when the chart is clicked it gets 6 hits, useMemo helps to keep it to only one hit
  const handleTaskChange = useMemo(() => () => {
    // debugger;
    Object.values(updatedTasks).forEach((t) => {
      // debugger;
      dispatch(updateTask(projectId, t)).then(() => {
        setTasksProcessing(prev => (prev-1));
      })
      setTasksProcessing(prev => (prev + 1));
    })


    // dispatch(updateTask(projectId, updatedTask));
  }, [dispatch, projectId, updatedTasks]);

  const debouncedTaskChange = useMemo(() => debounce(handleTaskChange, 250), [handleTaskChange])

  function initializeTasks(tasks) {
    let newTasks = {};

    tasks.forEach((task) => {
      // debugger;
      newTasks[task._id] = task;
    })
    // debugger;
    setUpdatedTasks(tasks)
  };

// ------------------------------------------------------------------------------------------------------------------


// Generate the Gantt chart
useEffect(() => {
  console.log("HIT THE CHART")
  if (ganttRef.current && formattedTasks.length && formattedTime && tasksProcessing === 0) {
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
        
        // debugger;
        console.log("on_date_change", task);
        const updatedTask = { ...task, _id: task.id, startDate: start, endDate: end }

        setUpdatedTasks((prev) => {
          // prev.push(updatedTask);
          prev[task.id] = {...prev[task.id], startDate: start, endDate: end, _id: task.id}
          return prev;
        })

        debouncedTaskChange();
      }, 
      on_progress_change: function (task, progress) {
        console.log("on_progress_change");

        setUpdatedTasks((prev) => {
          // prev.push(updatedTask);
          prev[task.id] = {...prev[task.id], progress, _id: task.id}
          return prev;
        })

        debouncedTaskChange();
      }
    });
  }
}, [ganttRef, formattedTasks, formattedTime, debouncedTaskChange, tasksProcessing])

return (

  <>
    <svg id="gantt" className="gantt" ref={ganttRef}></svg>
  </>

)

}