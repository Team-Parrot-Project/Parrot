import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Gantt from 'frappe-gantt';
import './GanttChart.css';
import { fetchProject } from '../../../store/project';

export default function GanttChart() {

  const dispatch = useDispatch()
  const time = useSelector(state => state.timeframe.selectedTimeframe);
  const formattedTime = time.charAt(0).toUpperCase() + time.slice(1);



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };






  const projectTasks = useSelector(state => state.projects);
  console.log(projectTasks)

  const formattedTasks = projectTasks['645c6a5c595bdfe7a1304e8c']?.tasks.map((task, index) => {
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
  });

  console.log(formattedTasks)

  useEffect(() => {
    dispatch(fetchProject('645c6a5c595bdfe7a1304e8c'))



    const tasks = [
      {
        id: 'Task 1',
        name: 'Redesign website',
        start: '2023-01-01',
        end: '2023-01-10',
        progress: 70,
        dependencies: ''
      },
      {
        id: 'Task 2',
        name: 'Develop new features',
        start: '2023-01-11',
        end: '2023-01-20',
        progress: 50,
        dependencies: 'Task 1'
      },
      {
        id: 'Task 3',
        name: 'Develop new features',
        start: '2023-02-11',
        end: '2023-02-20',
        progress: 50,
        dependencies: ['Task 2', 'Task 1']
      },
      {
        id: 'Task 4',
        name: 'Develop new features',
        start: '2023-03-11',
        end: '2023-03-20',
        progress: 50,
        dependencies: ['Task 3', 'Task 2']
      },
      {
        id: 'Task 5',
        name: 'Develop new features',
        start: '2023-02-11',
        end: '2023-04-20',
        progress: 50,
        dependencies: 'Task 4'
      },
      {
        id: 'Task 6',
        name: 'Develop new features',
        start: '2023-05-11',
        end: '2023-05-20',
        progress: 50,
        dependencies: 'Task 5'
      },
      {
        id: 'Task 7',
        name: 'Develop new features',
        start: '2023-06-11',
        end: '2023-06-20',
        progress: 50,
        dependencies: 'Task 6'
      },
      {
        id: 'Task 8',
        name: 'Develop new features',
        start: '2023-07-11',
        end: '2023-07-20',
        progress: 50,
        dependencies: 'Task 7'
      },
      {
        id: 'Task 9',
        name: 'Develop new features',
        start: '2023-08-11',
        end: '2023-08-20',
        progress: 50,
        dependencies: 'Task 8'
      },
      {
        id: 'Task 10',
        name: 'Develop new features',
        start: '2023-09-11',
        end: '2023-09-20',
        progress: 50,
        dependencies: ''
      },
      // Add more tasks as needed
    ];


    const gantt = new Gantt("#gantt", formattedTasks, {
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




    // gantt.change_view_mode('Week') // this can be a dropdown - Quarter Day, Half Day, Day, Week, Month
  }, [formattedTime, dispatch]);

  return (

    <>
        <svg id="gantt" className="gantt"></svg>
    </>


  )


}
