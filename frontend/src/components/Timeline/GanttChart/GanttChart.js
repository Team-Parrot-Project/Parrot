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
        dependencies: 'Task 2'
      },
      {
        id: 'Task 4',
        name: 'Develop new features',
        start: '2023-03-11',
        end: '2023-03-20',
        progress: 50,
        dependencies: 'Task 3'
      },
      {
        id: 'Task 5',
        name: 'Develop new features',
        start: '2023-04-11',
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
        dependencies: 'Task 9'
      },
      // Add more tasks as needed
    ];

    let startViewMode = 'Month'

    const gantt = new Gantt("#gantt", tasks, {
      header_height: 50,
      column_width: 30,
      step: 24,
      view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
      bar_height: 20,
      bar_corner_radius: 3,
      arrow_curve: 5,
      padding: 18,
      view_mode: startViewMode,
      date_format: 'YYYY-MM-DD',
      language: 'en', // or 'es', 'it', 'ru', 'ptBr', 'fr', 'tr', 'zh', 'de', 'hu'
      custom_popup_html: null
  });




    // gantt.change_view_mode('Week') // this can be a dropdown - Quarter Day, Half Day, Day, Week, Month
  }, []);

  return (

    <>
      <svg id="gantt" className="gantt"></svg>
    </>


  )


}
