import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ProjectCreateForm from './ProjectCreateForm';

export default function ProjectCreateModal() {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  if(showModal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  return (
    <>
      <button className='create-project-button' onClick={() => setShowModal(true)}>Create Project</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ProjectCreateForm onSubmit={closeModal} closeModal={closeModal} />
        </Modal>
      )}
    </>
  );

}
