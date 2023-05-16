import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTask, updateTask } from "../../../store/task";
import { fetchProject, getProject } from "../../../store/project";
import { formatDate } from "../../../store/util";
import './TaskUpdateForm.css';

export default function TaskUpdateForm({taskId,projectId}) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [blockingTasks, setBlockingTasks] = useState([]);
    const [errors, setErrors] = useState([]);
    const currentTask = useSelector(getTask(taskId));
    const project = useSelector(getProject(projectId));

    useEffect(()=>{
        if (currentTask) {
        setTitle(currentTask.title);
        setDescription(currentTask.description);
        setStartDate(formatDate(currentTask.startDate));
        setDueDate(formatDate(currentTask.endDate));
        setBlockingTasks(currentTask.blockingTasks || []);
    }
    },[currentTask,setTitle,setDescription,setDueDate])

    useEffect(()=>{
        dispatch(fetchProject(projectId))
    },[dispatch])

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedTask = {...currentTask, title, description, startDate, dueDate, blockingTasks};
        try {
            dispatch(updateTask(projectId, updatedTask));
            window.location.reload();
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
            <div>
                <label htmlFor="startDate">Start Date</label>
                <input id="startDate" type="date" required value={startDate} onChange={(event) => setStartDate(event.target.value)} />
            </div>
            <div>
                <label htmlFor="dueDate">Due Date</label>
                <input id="dueDate" type="date" required value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
            </div>
            <div>
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
            </div>
            <button type="submit">Update Task</button>
            {errors && errors.map((error) => <div key={error}>{error}</div>)}
        </form>
    )
}
