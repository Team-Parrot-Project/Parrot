import jwtFetch from "./jwt";
import { ADD_PROJECT } from "./project";

const ADD_TASK = 'Task/addTask';
const ADD_TASKS = 'Task/addTasks'
const REMOVE_TASK = 'Task/removeTask';

export const addTask = (task)=>{
    return {
        type: ADD_TASK,
        task: task
    }
}

export const addTasks = (tasks)=>{
    return {
        type: ADD_TASKS,
        tasks: tasks
    }
}

export const removeTask = (taskId)=>{
    return {
        type: REMOVE_TASK,
        taskId: taskId
    }
}

export const taskReducer = (state = {},action) =>{
    const newState = {...state};
    switch(action.type){
        case ADD_TASK:
            return {...state, [action.task.id]: action.task}
        case ADD_TASKS:
            return {...action.tasks}
        case REMOVE_TASK:
            delete newState[action.taskId]
            return newState
        case ADD_PROJECT:
            return {...action.project.tasks}
        default:
            return state;
    }
}

export default taskReducer;

export const getTask = (taskId) => (state)=>{
    if(state.tasks){
        return state.tasks[taskId]
    }else{
        return null;
    }
}

export const getTasks = (state)=>{
    if(state.tasks){
        return Object.values(state.tasks)
    }else{
        return [];
    }
}
export const fetchTasks = (projectId)=>async dispatch=>{
    let res = await jwtFetch(`/api/projects/${projectId}`)
    if(res.ok){
        let data = await res.json();
        dispatch(addTasks(data.tasks));
    }
}

export const createTask = (projectId,task)=>async dispatch =>{
    let res = await jwtFetch(`/api/projects/${projectId}/tasks`,{
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            'Content-Type':'application/json'
        }
    })
    if(res.ok){
        let data = await res.json();
        dispatch(addTask(data));
    }
}

export const updateTask = (projectId,task)=> async dispatch =>{
    let res = await jwtFetch(`/api/projects/${projectId}/tasks/${task.id}`,{
        method: "PATCH",
        body: JSON.stringify(task),
        headers: {
            'Content-Type':'application/json'
        }
    });
    if(res.ok){
        let data = await res.json();
        dispatch(addTask(data));
    }
}

export const deleteTask = (projectId,taskId)=>async dispatch =>{
    let res = await jwtFetch(`/api/projects/${projectId}/tasks/${taskId}`,{
        method: "DELETE",
    })
    if(res.ok){
        dispatch(removeTask(taskId));
    }
}
