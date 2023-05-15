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
    const [dueDate, setDueDate] = useState('');
    const task = useSelector(getTask(taskId));

    useEffect(()=>{
        if(task){
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(formatDate(task.endDate)); }
    },[task,setTitle,setDescription,setDueDate])

    useEffect(()=>{
        dispatch(fetchProject(projectId))
    },[dispatch])

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedTask = {...task, title, description, dueDate};
        console.log(updatedTask,"updatedTask")
        dispatch(updateTask(projectId, updatedTask));
    };

    return (
        <form onSubmit={handleSubmit} className="task-update-form">
            <div>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} />
            </div>
            <div>
                <label htmlFor="dueDate">Due Date</label>
                <input id="dueDate" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
            </div>
            <button type="submit">Update Task</button>
        </form>
    )
}
