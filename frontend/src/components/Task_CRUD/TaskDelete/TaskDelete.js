import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { useDispatch } from "react-redux";
import * as taskActions from "../../../store/task";
import './TaskDelete.css';


export default function DeleteTaskModal(props) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const taskId = props.taskId; // assuming taskId is passed as a prop

    const handleDelete = async () => {
        setIsDeleting(true);
        await dispatch(taskActions.deleteTask(taskId));
        setShowModal(false);
    };
    return (
        <>
        <button onClick={() => setShowModal(true)}>Delete Task</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                <div className="delete-task-modal">
                <p>Are you sure you want to delete this task?</p>
                <button onClick={handleDelete} disabled={isDeleting}>Yes, delete task</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
                </Modal>
            )}
        </>
    );
}
