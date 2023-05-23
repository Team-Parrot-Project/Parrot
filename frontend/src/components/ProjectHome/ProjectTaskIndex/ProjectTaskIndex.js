import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as projectActions from '../../../store/project';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { formatDate } from '../../../store/util';
import TaskUpdateModal from '../../Task_CRUD/TaskUpdateForm';
import DeleteTaskModal from '../../Task_CRUD/TaskDelete/TaskDelete';
import './ProjectTaskIndex.css';
import { fetchProject } from '../../../store/project';
import { getProject } from '../../../store/project';
import TableRow from '../../TableRow/TableRow';
import { Modal } from '../../../context/Modal';
import TaskUpdateForm from '../../Task_CRUD/TaskUpdateForm/TaskUpdateForm';
import { selectUsers } from '../../../store/user';

function ProjectTaskIndex() {
  const {projectId} = useParams();
  // const [allTasks,setAllTasks] = useState([]);

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modalTaskId, setModalTaskId] = useState();
  const allUsers = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchProject(projectId))
  }, [dispatch, projectId])

  const project = useSelector(projectActions.getProject(projectId));
  const allTasks = useSelector(projectActions.getProjectTasks(projectId));

  // useEffect(()=>{
  //   if(project){
  //       setAllTasks(project.tasks);
  //     }
  //     console.log(allTasks, "tasks");
  // },[project, setAllTasks, allTasks])

  // function mapTasks() {
  //   if(project && project.tasks) {
  //     let allTasks = project.tasks;
  //     return (
  //       <>

  //     </>)
  //   }
  // }

  function taskClick(e, taskId) {
    // console.log("HERE!!!!!");
    // debugger;
    // setModalTaskId(taskId);
    // setShowModal(true);
  }

  return (

    <>
    {showModal &&
      <Modal onClose={() => setShowModal(false)}>
      <TaskUpdateForm taskId={modalTaskId} projectId={projectId} closeModal={() => setShowModal(false)} />
  </Modal>
    }
      <div className="project-task-index">

        <TableRow row={["Title",
                      "Description",
                      "Assignee",
                      "Start",
                      "End",
                      ""]}
                  rowClass={"project-task-table-header"}
                  cellClasses={[
                    "defaulf-cell-class pjt-narrow",
                    "defaulf-cell-class pjt-wide",
                    "defaulf-cell-class pjt-narrow",
                    "defaulf-cell-class pjt-narrow",
                    "defaulf-cell-class pjt-narrow",
                    "defaulf-cell-class pjt-last",
                  ]}/>

        {allTasks.map((task) => {
          return <TableRow
          rowClass={"project-task-table-row no-hover"}
          rowElement={task._id}
          key={task._id}
          row={[
            task.title,
            task.description,
            allUsers[task.assignee]?.username,
            formatDate(task.startDate),
            formatDate(task.endDate),
            <>
                <TaskUpdateModal taskId={task._id} projectId={project._id} />
                <DeleteTaskModal  taskId={task._id} projectId={project._id} />
                </>,
          ]}
          cellClasses={
            [
              "project-task-cell pjt-narrow",
              "project-task-cell pjt-wide",
              "project-task-cell pjt-narrow",
              "project-task-cell pjt-narrow",
              "project-task-cell pjt-narrow",
              "project-task-cell pjt-narrow pjt-last",
            ]
          }
          />
        })}
      </div>
    </>
  );
}

export default ProjectTaskIndex;
