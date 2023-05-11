import React, { useState } from 'react';
import './ProjectCreateForm.css';
import { createProject } from '../../../store/project';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../../store/session';

const ProjectCreateForm = () => {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const adminId = useSelector(sessionActions.getUser);
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
      collaborators: []
    }

    try {
      // Send a POST request to the server to save the new project
      const response = dispatch(createProject(newProject));

      // Update the UI to indicate that the project has been created
      alert('Project created successfully!');
      setProjectName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    } catch (err) {
      // Display an error message if there's an error sending the request
      alert('Failed to create project. Please try again later.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="projectName">Project Name:</label>
      <input
        type="text"
        id="projectName"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="startDate">Start Date:</label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <label htmlFor="endDate">End Date:</label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectCreateForm;
