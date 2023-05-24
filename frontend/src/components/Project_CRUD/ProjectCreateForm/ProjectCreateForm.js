import React, { useState } from 'react';
import { createProject } from '../../../store/project';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../../store/session';
import './ProjectCreateForm.css'
import { addDaysToDate, formatDate } from '../../../store/util';

export default function ProjectCreateForm({ closeModal }) {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [collaborators, setCollaborators] = useState([]);
  const [endDate, setEndDate] = useState(addDaysToDate(formatDate(new Date()),1));
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
      <label htmlFor="projectName">Project Name:</label>
      <input type="text" required id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
      <label htmlFor="description">Description:</label>
      <textarea required id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="project-create-form-date-wrapper">
        <div>
          <label htmlFor="startDate" className="project-create-form-start-date-label" >Start Date:</label>
          <input type="date" required id="startDate" className="project-create-form-start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="endDate" className="project-create-form-end-date-label">End Date:</label>
          <input type="date" required id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>
      <div className="project-create-form-add-collaborators-wrapper">
        <div>
          <label htmlFor="collaborators" className="project-create-form-collaborators-label">Add Collaborators:</label>
        </div>
        <div className="project-create-checkbox-container">
          {Object.values(users).map((user) => {
            if (adminId === user._id) {
              return null;
            } else {
              return (
                <div key={user._id} className="project-create-checkbox-item">
                  <label className="project-create-checkbox-title" htmlFor={user._id}>{user.username}</label>
                  <input
                    type="checkbox"
                    id={user._id}
                    value={user._id}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCollaborators(prevCollaborators => [...prevCollaborators, e.target.value]);
                      } else {
                        setCollaborators(prevCollaborators => prevCollaborators.filter(id => id !== e.target.value));
                      }
                    }}
                  />

                </div>
              )
            }
          })}
        </div>
      </div>

    </form>
  );
};
