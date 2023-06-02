import React, { useState } from 'react';
import { createProject } from '../../../store/project';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../../store/session';
import { Tooltip } from 'react-tooltip'
import './ProjectCreateForm.css'
import { addDaysToDate, formatDate } from '../../../store/util';

export default function ProjectCreateForm({ closeModal }) {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [collaborators, setCollaborators] = useState([]);
  const [endDate, setEndDate] = useState(addDaysToDate(formatDate(new Date()), 1));
  const adminId = useSelector(sessionActions.getUser);
  const users = useSelector((state) => state.users);



  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate input values
    if (!projectName || !description || !startDate || !endDate) {
      // Display an error message if any input field is empty
      alert('Please fill in all fields.');
      return;
    }

    // Create a new project object with input values
    const newProject = {
      title: projectName,
      description: description,
      adminId: adminId,
      startDate: startDate,
      endDate: endDate,
      collaborators: collaborators
    }

    try {
      // Send a POST request to the server to save the new project
      const response = dispatch(createProject(newProject));

      // Update the UI to indicate that the project has been created
      setProjectName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      closeModal();
    } catch (err) {
      // Display an error message if there's an error sending the request
      alert('Failed to create project. Please try again later.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="project-create-form">
      <p className="project-create-form-title">Please fill out to create a project</p>
      <button type="submit" className="project-create-form-submit-button" >Create</button>
      <label htmlFor="projectName">Project Name</label>
      <input className="project-create-form-name-input" type="text" required id="projectName" value={projectName} maxLength={50} onChange={(e) => setProjectName(e.target.value)} />
      <label htmlFor="description">Description</label>
      <textarea className="project-create-form-description-input" required id="description" value={description} maxLength={500} onChange={(e) => setDescription(e.target.value)} />
      <div className="project-create-form-date-wrapper">
        <div>
          <label htmlFor="startDate" className="project-create-form-start-date-label" >Start Date</label>
          <input type="date" required id="startDate" className="project-create-form-start-date-input" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="endDate" className="project-create-form-end-date-label">End Date</label>
          <input type="date" min={addDaysToDate(startDate, 1)} required id="endDate" className="project-create-form-end-date-input" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>
      <div className="project-create-form-add-collaborators-wrapper">
        <div>
          <label htmlFor="collaborators" className="project-create-form-collaborators-label">Add Collaborators</label>
        </div>
        <select data-tooltip-id="clickCtrlMultipe" id="collaborators" value={collaborators} onChange={(e) =>
          setCollaborators(Array.from(e.target.selectedOptions, (option) => option.value))} multiple>
          {Object.values(users).map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
        <Tooltip id="clickCtrlMultipe" effect="solid" place="bottom">
          Hold ctrl & click to select multiple collaborators
        </Tooltip>
      </div>

    </form>
  );
};
