import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as projectActions from '../../../store/project';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { formatDate, monthDayYear } from '../../../store/util';
import TaskUpdateModal from '../../Task_CRUD/TaskUpdateForm';
import DeleteTaskModal from '../../Task_CRUD/TaskDelete/TaskDelete';
import './ProjectTaskIndex.css';
import { fetchProject } from '../../../store/project';
import TableRow from '../../TableRow/TableRow';
import { Modal } from '../../../context/Modal';
import TaskUpdateForm from '../../Task_CRUD/TaskUpdateForm/TaskUpdateForm';
import { selectUsers } from '../../../store/user';
import { Tooltip } from 'react-tooltip'

export default function ProjectTaskIndex() {
  const { projectId } = useParams();

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modalTaskId, setModalTaskId] = useState();
  const [taskDetailId, setTaskDetailId] = useState(null);
  const allUsers = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchProject(projectId))
  }, [dispatch, projectId])

  const project = useSelector(projectActions.getProject(projectId));
  const allTasks = useSelector(projectActions.getProjectTasks(projectId));

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <TaskUpdateForm
            taskId={modalTaskId}
            projectId={projectId}
            closeModal={() => setShowModal(false)}
          />
        </Modal>
      )}
      <div className="project-task-index">
        <div className="project-show-table-container" data-tooltip-id="clickForTaskDetails">
          <TableRow
            row={[
              "Title",
              "Description",
              "Assignee",
              "Start",
              "Due",
              "Modify",
            ]}
            rowClass={"project-task-table-header"}
            cellClasses={[
              "defaulf-cell-class pjt-narrow",
              "defaulf-cell-class pjt-wide",
              "defaulf-cell-class pjt-narrow",
              "defaulf-cell-class pjt-narrow",
              "defaulf-cell-class pjt-narrow",
              "defaulf-cell-class pjt-last",
            ]}
          />

          {allTasks.map((task) => (
            <>
              <div onClick={() =>
                setTaskDetailId(taskDetailId === task._id ? null : task._id)
              }>
                <TableRow
                  rowClass={"project-task-table-row no-hover"}
                  rowElement={task._id}
                  key={task._id}
                  row={[
                    task.title,
                    task.description,
                    allUsers[task.assignee]?.username,
                    monthDayYear(formatDate(task.startDate)),
                    monthDayYear(formatDate(task.endDate)),
                    <>
                      <TaskUpdateModal taskId={task._id} projectId={project._id} />
                      <DeleteTaskModal taskId={task._id} projectId={project._id} />
                    </>,
                  ]}
                  cellClasses={[
                    "project-task-cell pjt-narrow",
                    "project-task-cell pjt-wide",
                    "project-task-cell pjt-narrow",
                    "project-task-cell pjt-narrow",
                    "project-task-cell pjt-narrow",
                    "project-task-cell pjt-narrow pjt-last",
                  ]}
                />
              </div>
              {taskDetailId === task._id && (
                <div className="project-show-task-detail-dropdown">
                  <p><strong>Title:</strong> {task.title}</p>
                  <p><strong>Description:</strong> {task.description}</p>
                  <p><strong>Assignee:</strong> {allUsers[task.assignee]?.username}</p>
                  <p><strong>Start Date:</strong> {formatDate(task.startDate)}</p>
                  <p><strong>End Date:</strong> {formatDate(task.endDate)}</p>
                  <p><strong>Progress:</strong> {task.progress}</p>
                  <p><strong>Dependent Tasks:</strong> {task.blockingTasks}</p>
                </div>
              )}
            </>
          ))}
        </div>
        <Tooltip id="clickForTaskDetails" effect="solid" place="top">
          Click on a task to view more details
        </Tooltip>
      </div>
    </>
  );

}
