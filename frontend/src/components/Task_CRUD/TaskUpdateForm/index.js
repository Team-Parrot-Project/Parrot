import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import TaskUpdateForm from './TaskUpdateForm';
import { Tooltip } from 'react-tooltip'
import './TaskIndex.css';

export default function TaskUpdateModal({ taskId, projectId }) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <button className='update-task-button' onClick={(e) => {
        e.stopPropagation();
        setShowModal(true);
      }}
        data-tooltip-id="editTask">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a2a0a2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
          <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
        </svg>
      </button>
      <Tooltip id="editTask" effect="solid" place="top">
        Edit Task
      </Tooltip>
      {showModal && (
        <Modal onClose={(e) => {
          e.stopPropagation();
          setShowModal(false);
        }}>
          <TaskUpdateForm taskId={taskId} projectId={projectId} closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}
