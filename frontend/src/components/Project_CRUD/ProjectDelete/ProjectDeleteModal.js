import React, { useState } from "react";
import { Modal } from '../../../context/Modal';
import { useDispatch } from "react-redux";
import * as projectActions from "../../../store/project";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import './ProjectDelete.css';

export default function DeleteProjectModal() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const {projectId} = useParams();
    const history = useHistory();

    const handleDelete = async () => {
        setIsDeleting(true);
        await dispatch(projectActions.deleteProject(projectId));
        setShowModal(false);
        history.push('/');
    };

    return (
        <>
            <button className="delete-project-button" onClick={() => setShowModal(true)}>Delete Project</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                <div className="delete-project-modal">
                <p>Are you sure you want to delete this project?</p>
                <button className="yes-delete-project" onClick={handleDelete} disabled={isDeleting}>Yes</button>
                <button className="no-delete-project" onClick={() => setShowModal(false)}>No</button>
                </div>
                </Modal>
            )}
        </>
    );
}
