import React, { useEffect } from 'react';
import Gantt from 'frappe-gantt';
import './GanttChart.css';

export default function GanttChart() {

  useEffect(() => {
    const tasks = [
      {
        id: 'Task 1',
        name: 'Redesign website',
        start: '2023-01-01',
        end: '2023-01-10',
        progress: 70,
        dependencies: 'Task 2'
      },
      {
        id: 'Task 2',
        name: 'Develop new features',
        start: '2023-01-11',
        end: '2023-01-20',
        progress: 50,
        dependencies: ''
      },

      // Add more tasks as needed
    ];

    const gantt = new Gantt('#gantt', tasks);
    gantt.change_view_mode('Week') // this can be a dropdown - Quarter Day, Half Day, Day, Week, Month
  }, []);

  return (


    <>
      <svg id="gantt"></svg>
    </>


  )


}
