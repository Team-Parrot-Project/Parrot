import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ProjectUpdateForm from './ProjectUpdateForm';

export default function ProjectUpdateModal({projectId}) {
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);

    return (
        <>
            <button className='update-project-button' onClick={() => setShowModal(true)}>Update Project</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ProjectUpdateForm projectId={projectId} onSubmit={closeModal}/>
                </Modal>
            )}
        </>
    );
}