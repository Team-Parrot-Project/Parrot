import React, { useState } from "react";
import { Modal } from '../../../context/Modal';
import { useDispatch } from "react-redux";
import * as projectActions from "../../../store/project";

export default function DeleteProjectModal(props) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const projectId = props.projectId; // assuming projectId is passed as a prop

    const handleDelete = async () => {
        setIsDeleting(true);
        await dispatch(projectActions.deleteProject(projectId));
        setShowModal(false);
    };

    return (
        <>
            <button onClick={() => setShowModal(true)}>Delete Project</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                <p>Are you sure you want to delete this project?</p>
                <button onClick={handleDelete} disabled={isDeleting}>Yes, delete project</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
                </Modal>
            )}
        </>
    );
}
