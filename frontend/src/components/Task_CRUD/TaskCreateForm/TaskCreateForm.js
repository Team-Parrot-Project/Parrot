import React, { useState } from 'react';
import  { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { createTask } from '../../../store/task';
import { formatDate } from '../../../store/util';
import './TaskCreateForm.css';

const TaskCreateForm = ({ taskTitle = '' }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(taskTitle);
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [dueDate, setDueDate] = useState(formatDate(new Date()));
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState('in progress');
  const [progress, setProgress] = useState(0);
  const currentUser = useSelector(state => state.session.user);
  const {projectId} = useParams();
  const users = useSelector(state => state.users);

  const statusOptions = ['not started','in progress', 'complete']

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
      alert('Task created successfully!');
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
    <form onSubmit={handleSubmit}className="task-create-form">
      <label htmlFor="title">Task Name:</label>
      <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <label htmlFor="description">Description:</label>
      <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <label htmlFor="status">Status:</label>
      <select id='status' value={status} onChange={(e) => setStatus(e.target.value)}>
        {statusOptions.map((o, ix) => {
          return (<option value={o} key={ix}>{o}</option>)
        })}
      </select>
      <label htmlFor="startDate">Start Date:</label>
      <input type="date" id="startDate" value={startDate} required onChange={(e) => setStartDate(e.target.value)}/>
      <label htmlFor="dueDate">Due Date:</label>
      <input type="date" id="dueDate" min={startDate || ""} required value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
      <label htmlFor="assignee">Assignee:</label>
      <select id="assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
        <option value="">Select an assignee</option>
        {Object.values(users).map(user => (
          <option key={user._id} value={user._id}>{user.username}</option>
        ))}
      </select>
      <label htmlFor="progress">Progress:</label>
      <input type="integer" id="progress" min={0} max={100} value={progress} onChange={(e) => setProgress(e.target.value)}/>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskCreateForm;
