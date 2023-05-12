import React, { useEffect, useMemo, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Gantt from 'frappe-gantt';
import './GanttChart.css';
import { fetchProject } from '../../../store/project';
import { fetchUser } from '../../../store/user';

export default function GanttChart() {
  const { projectId } = useParams()
  const dispatch = useDispatch()
  const time = useSelector(state => state.timeframe.selectedTimeframe);
  const userId = useSelector(state => state.session.user._id);
  const formattedTime = useMemo(() => time ? time.charAt(0).toUpperCase() + time.slice(1) : null, [time]);

  // The useRef and useMemo are needed otherwise the chart would not render properly on first load and or would cause inifinte rerenders.

  // Grab the project from state
  const projectTasks = useSelector(state => state.projects);

  // Function to reformat the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  // Reformate the tasks data for the Gantt chart
  const formattedTasks = useMemo(() => projectTasks[projectId]?.tasks
  ? projectTasks[projectId].tasks.map((task, index) => {
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
  : [], [projectTasks, projectId]);

  useEffect(() => {

    // Add the project to state
    dispatch(fetchProject(projectId))
    dispatch(fetchUser(userId))

  }, [dispatch, projectId, userId]);

  const ganttRef = useRef();

  useEffect(() => {
    // Generate the Gantt chart
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
        custom_popup_html: null
      });
    }
  }, [ganttRef, formattedTasks, formattedTime])

  return (

    <>
        <svg id="gantt" className="gantt" ref={ganttRef}></svg>
    </>


  )

}
