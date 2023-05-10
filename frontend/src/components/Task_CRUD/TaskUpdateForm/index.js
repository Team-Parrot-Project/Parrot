import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import TaskUpdateForm from './TaskUpdateForm';

export default function TaskUpdateModal({taskId}) {
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);

    return (
        <>
            <button className='update-task-button' onClick={() => setShowModal(true)}>Update Task</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TaskUpdateForm taskId={taskId} onSubmit={closeModal}/>
                </Modal>
            )}
        </>
    );
}
