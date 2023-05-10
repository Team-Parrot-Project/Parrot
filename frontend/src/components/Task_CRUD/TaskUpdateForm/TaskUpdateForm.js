import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTask, updateTask } from "../../../store/task";

export default function TaskUpdateForm({taskId}) {
    const dispatch = useDispatch();
    const task = useSelector(getTask(taskId));
    console.log(task);
    const [title, setTitle] = useState(task?.title);
    const [description, setDescription] = useState(task?.description);
    const [dueDate, setDueDate] = useState(task?.dueDate);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedTask = {...task, title, description, dueDate};
        dispatch(updateTask(task.projectId, updatedTask));
    };

    return (
        <form onSubmit={handleSubmit}>
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
