import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProject, updateProject } from '../../../store/project';

export default function ProjectUpdateForm({ projectId }) {
  const dispatch = useDispatch();
  const project = useSelector((state) => getProject(state, projectId));

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (project) {
      setProjectName(project.title);
      setDescription(project.description);
      setStartDate(project.startDate);
      setEndDate(project.endDate);
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName || !description || !startDate || !endDate) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedProject = {
      id: projectId,
      title: projectName,
      description: description,
      startDate: startDate,
      endDate: endDate,
    };

    try {
      await dispatch(updateProject(updatedProject));
      alert('Project updated successfully!');
    } catch (err) {
      alert('Failed to update project. Please try again later.');
    }
  };

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
      <button type="submit">Update Project</button>
    </form>
  );
}