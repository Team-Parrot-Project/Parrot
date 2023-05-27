import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { useDispatch } from "react-redux";
import { Tooltip } from 'react-tooltip'
import * as taskActions from "../../../store/task";
import './TaskDelete.css';


export default function DeleteTaskModal(props) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const taskId = props.taskId; // assuming taskId is passed as a prop
  const projectId = props.projectId; // assuming projectId is passed as a prop

  const handleDelete = async () => {
    setIsDeleting(true);
    dispatch(taskActions.deleteTask(projectId, taskId));
    setShowModal(false);
  };

  if(showModal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  return (
    <>
      <button className="delete-task-modal-button" onClick={(e) => {
        e.stopPropagation();
        setShowModal(true);
      }} data-tooltip-id="deleteTask">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
      <Tooltip id="deleteTask" effect="solid" place="top">
        Delete Task
      </Tooltip>
      {showModal && (
        <Modal onClose={(e) => {
          e.stopPropagation();
          setShowModal(false);
        }}>
          <div className="delete-task-modal">
            <p>Are you sure you want to delete this task?</p>
            <button className="yes-delete-task" onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }} disabled={isDeleting}>Yes</button>
            <button className="no-delete-task" onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
            }}>No</button>
          </div>
        </Modal>
      )}
    </>
  );

}
