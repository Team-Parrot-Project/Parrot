import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTask, updateTask } from "../../../store/task";
import { fetchProject, getProject } from "../../../store/project";
import { formatDate } from "../../../store/util";
import './TaskUpdateForm.css';

export default function TaskUpdateForm({ taskId, projectId, closeModal }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [blockingTasks, setBlockingTasks] = useState([]);
  const [errors, setErrors] = useState([]);
  const [assigneeId, setAssigneeId] = useState('');
  const [status, setStatus] = useState('in progress');
  const currentTask = useSelector(getTask(taskId));
  const [progress, setProgress] = useState(0);
  const project = useSelector(getProject(projectId));
  const statusOptions = ['not started', 'in progress', 'complete'];
  const [loadedTask, setLoadedTask] = useState(false);

  const collaborators = useSelector(state => {
    const currentProject = state.projects[projectId] || {};
    const collaboratorIds = currentProject.collaborators || [];
    return collaboratorIds.map(id => state.users[id]);
  });

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setStartDate(formatDate(currentTask.startDate));
      setDueDate(formatDate(currentTask.endDate));
      setBlockingTasks(currentTask.blockingTasks || []);
      setAssigneeId(currentTask.assignee);
      setProgress(currentTask.progress);
      setLoadedTask(true);
    }
  }, [currentTask, setTitle, setDescription, setDueDate, setAssigneeId])

  useEffect(() => {
    dispatch(fetchProject(projectId))
  }, [dispatch, projectId])

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTask = { ...currentTask, title, description, startDate, endDate: dueDate, blockingTasks, assignee: assigneeId, progress };

    try {
      dispatch(updateTask(projectId, updatedTask));

      closeModal();
    } catch (err) {
      setErrors(err.errors);
    }
  };

  function handleAssigneeChange(e) {
    setAssigneeId(e.target.value);
  }

  // there is no point in rendering this form unless there is a pre-existing task, therefore returning early until there is a form in which case it will continue to render the form to perform an update
  if (!loadedTask) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="task-update-form">
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" required value={title} onChange={(event) => setTitle(event.target.value)} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} />
      </div>
      <label htmlFor="status">Status:</label>
      <select id='status' value={status} onChange={(e) => setStatus(e.target.value)}>
        {statusOptions.map((o, ix) => {
          return (<option value={o} key={ix}>{o}</option>)
        })}
      </select>
      <div>
        <label htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          type="date"
          required
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)} />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input id="dueDate"
          type="date"
          min={startDate || ""}
          required
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)} />
      </div>
      <label htmlFor="assignee">Assignee</label>
      <select id="assignee" value={assigneeId} onChange={(e) => handleAssigneeChange(e)}>
        {Object.values(collaborators).map(collaborator => {
          // logIt(collaborator._id, assigneeId);
          return (<option key={collaborator._id} value={collaborator._id}
          >{collaborator.username}</option>)
        })}
      </select>
      <label htmlFor="progress">Progress: {progress}</label>
      <input id="progress" type="range" min="0" max="100" step={10} value={progress} onChange={(e) => setProgress(e.target.value)} />
      <label htmlFor="blockingTasks">Blocking Tasks (ctrl + click to select/deselect multiple tasks)</label> <br />
      <select id="blockingTasks" value={blockingTasks} onChange={(event) =>
        setBlockingTasks(Array.from(event.target.selectedOptions, (option) => option.value))} multiple>
        {project && project.tasks
          .filter((task) => task._id !== taskId && task.startDate < currentTask.startDate) // Apply the condition
          .map((task) => (
            <option key={task._id} value={task._id}>
              {task.title}
            </option>
          ))}
      </select>
      <button type="submit" onClick={(e) => e.stopPropagation()} >Update</button>
      {errors && errors.map((error) => <div key={error}>{error}</div>)}
    </form>
  )
}
