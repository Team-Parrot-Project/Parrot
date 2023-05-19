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
    const [assignee, setAssignee] = useState('');
    const [status, setStatus] = useState('in progress');
    const currentTask = useSelector(getTask(taskId));
    const [progress, setProgress] = useState(0);
    const project = useSelector(getProject(projectId));
    const currentUser = useSelector(state => state.session.user);
    const statusOptions = ['not started','in progress', 'complete'];
    const users = useSelector(state => state.users);

    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.title);
            setDescription(currentTask.description);
            setStartDate(formatDate(currentTask.startDate));
            setDueDate(formatDate(currentTask.endDate));
            setBlockingTasks(currentTask.blockingTasks || []);
        }
    }, [currentTask, setTitle, setDescription, setDueDate])

    useEffect(() => {
        dispatch(fetchProject(projectId))
    }, [dispatch])

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedTask = { ...currentTask, title, description, startDate, endDate: dueDate, blockingTasks };
        // console.log(currentTask, "current task unspread");
        // console.log(...currentTask, "current task spread");
        console.log(updatedTask, "updateTask!!!!!");
        try {
            dispatch(updateTask(projectId, updatedTask));

            closeModal();
        } catch (err) {
            setErrors(err.errors);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-update-form">
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
            <label htmlFor="assignee">Assignee:</label>
            <select id="assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
                <option value="">Select an assignee</option>
                {Object.values(users).map(user => (
                <option key={user._id} value={user._id}>{user.username}</option>
                ))}
            </select>
      <label htmlFor="progress">Progress:</label>
      <input type="integer" id="progress" min={0} max={100} value={progress} onChange={(e) => setProgress(e.target.value)}/>
            <label htmlFor="blockingTasks">Blocking Tasks (ctrl + click to select/deselect multiple tasks)</label> <br/>
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
            <button type="submit">Update Task</button>
            {errors && errors.map((error) => <div key={error}>{error}</div>)}
        </form>
    )
}
