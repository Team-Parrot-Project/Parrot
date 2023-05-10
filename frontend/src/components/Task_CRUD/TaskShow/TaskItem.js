import { useSelector } from "react-redux";
import { getTask } from "../../../store/task";
import './TaskShow.css';

export default function TaskItem({taskId}) {
    const task = useSelector(getTask(taskId));

    if (!task) {
        return <div> Task not found </div>
    }

    return (
        <div className="task-show-container"> {task.title} Due date: {task.dueDate} </div>
    )
}
