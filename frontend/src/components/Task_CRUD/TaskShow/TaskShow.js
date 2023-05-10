import { useSelector } from "react-redux";
import { getTask } from "../../../store/task";
import './TaskShow.css';

export default function TaskShow({taskId}) {
    const task = useSelector(getTask(taskId));
    if (!task) {
        return <div> Task not found </div>
    }



    return (
        <div className="task-show-container">
            <h1 className="task-show-title"> {task?.title} </h1>
            <p className="task-show-description">{task?.description}</p>
            <p className="task-show-due-date">Due date: {task?.dueDate}</p>
        </div>
    )
}
