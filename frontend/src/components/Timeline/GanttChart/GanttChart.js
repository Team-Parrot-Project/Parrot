import React, { useEffect, useMemo, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Gantt from 'frappe-gantt';
import './GanttChart.css';
import { fetchProject } from '../../../store/project';

export default function GanttChart() {

  const dispatch = useDispatch()
  const time = useSelector(state => state.timeframe.selectedTimeframe);
  const formattedTime = useMemo(() => time ? time.charAt(0).toUpperCase() + time.slice(1) : null, [time]);



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
  const formattedTasks = useMemo(() => projectTasks['645c6a5c595bdfe7a1304e8c']?.tasks
  ? projectTasks['645c6a5c595bdfe7a1304e8c'].tasks.map((task, index) => {
    console.log(task.startDate, "GGGGGGGGGG")
    const sDate = task.startDate ? formatDate(task.startDate) : '';
    const eDate = task.endDate ? formatDate(task.endDate) : '';
    return {
      id: task._id,
      name: task.title,
      start: sDate,
      end: eDate,
      progress: Math.floor(Math.random() * 101),
      dependencies: task.blockingTasks //task.blockingTasks
    };
  })
  : [], [projectTasks]);

  useEffect(() => {

    // Add the project to state
    dispatch(fetchProject('645c6a5c595bdfe7a1304e8c'))

  }, [dispatch]);


      // This creates the Gantt chart
      // const gantt = new Gantt("#gantt", formattedTasks, {
      //   header_height: 50,
      //   column_width: 30,
      //   step: 24,
      //   view_modes: ['Day', 'Week', 'Month'], // this is also a 'Quarter Day', 'Half Day' but they can't render properly
      //   bar_height: 20,
      //   bar_corner_radius: 3,
      //   arrow_curve: 5,
      //   padding: 18,
      //   view_mode: formattedTime,
      //   date_format: 'YYYY-MM-DD',
      //   language: 'en', // or 'es', 'it', 'ru', 'ptBr', 'fr', 'tr', 'zh', 'de', 'hu'
      //   custom_popup_html: null
      // });
  const ganttRef = useRef();

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
