import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { createTask } from '../../../store/task';
import { addDaysToDate, formatDate } from '../../../store/util';
import './TaskCreateForm.css';

export default function TaskCreateForm({ taskTitle = '', closeModal }) {
  const [title, setTitle] = useState(taskTitle);
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [dueDate, setDueDate] = useState(addDaysToDate(formatDate(new Date()), 1));
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState('in progress');
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();
  const { projectId } = useParams();

  const collaborators = useSelector(state => {
    const currentProject = state.projects[projectId] || {};
    const collaboratorIds = currentProject.collaborators || [];
    return collaboratorIds.map(id => state.users[id]);
  });

  const statusOptions = ['not started', 'in progress', 'complete']

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a new task object with input values
    const newTask = {
      title: title,
      description: description,
      startDate: startDate,
      endDate: dueDate,
      status: status,
      assignee: assignee,
      progress: progress
    };

    try {
      // Send a POST request to the server to save the new task
      dispatch(createTask(projectId, newTask));

      // Update the UI to indicate that the task has been created
      closeModal();
      setTitle('');
      setDescription('');
      setDueDate('');
      setAssignee('');
      setProgress(0);
    } catch (err) {
      // Display an error message if there's an error sending the request
      alert('Failed to create task. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-create-form">
      <p className="task-create-form-header">Please fill out to create a task</p>
      <button className="task-create-form-button" type="submit">Create</button>
      <label htmlFor="title">Task Name</label>
      <input className="task-create-form-title-input" type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <label htmlFor="description">Description</label>
      <textarea className="task-create-form-description-input" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <div className="task-create-form-sub-container">
        <div>
          <div>
            <label htmlFor="status">Status</label>
          </div>
          <div>
            <select className="task-create-form-status-input" id='status' value={status} onChange={(e) => setStatus(e.target.value)}>
              {statusOptions.map((o, ix) => {
                return (<option value={o} key={ix}>{o}</option>)
              })}
            </select>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="startDate">Start Date</label>
          </div>
          <div>
            <input className="task-create-form-start-date-input" type="date" id="startDate" value={startDate} required onChange={(e) => setStartDate(e.target.value)} />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="dueDate">Due Date</label>
          </div>
          <div>
            <input className="task-create-form-due-date-input" type="date" id="dueDate" min={addDaysToDate(startDate, 1) || ""} required value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="assignee">Assignee</label>
          </div>
          <div>
            <select className="task-create-form-assignee-input" id="assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
              <option value="">Select assignee</option>
              {collaborators && Object.values(collaborators)
                .filter(collaborator => collaborator && collaborator._id)
                .map(collaborator => (
                  <option key={collaborator._id} value={collaborator._id}>{collaborator.username}</option>
                ))}
            </select>
          </div>
        </div>

      </div>
      <label className="task-create-progress-label" htmlFor="progress">Progress: {progress}</label>
      <input className="task-create-progress-input-bar" id="progress" type="range" min="0" max="100" step={1} value={progress} onChange={(e) => setProgress(e.target.value)} />

    </form>
  );

};
