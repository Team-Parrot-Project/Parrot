import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import TaskCreateForm from './TaskCreateForm';

export default function TaskCreateModal({taskTitle = ''}) {
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);

    return (
        <>
            <button className='create-task-button' onClick={() => setShowModal(true)}>Create Task</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TaskCreateForm onSubmit={closeModal} taskTitle={taskTitle}/>
                </Modal>
            )}
        </>
    );
}
