import jwtFetch from "./jwt";
import { ADD_PROJECT, ADD_PROJECTS } from "./project";

export const ADD_TASK = 'Task/addTask';
const ADD_TASKS = 'Task/addTasks'
export const REMOVE_TASK = 'Task/removeTask';
const PURGE_TASKS = 'Task/purgeTasks';


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

export const removeTask = (payload)=>{
    return {
        type: REMOVE_TASK,
        payload
    }
}

export const purgeTasks = ()=>{
    return {
        type: PURGE_TASKS
    }
}
const defaultState = {};

export const taskReducer = (state = defaultState,action) =>{
    const newState = {...state};
    switch(action.type){
        case ADD_TASK:
            return {...state, [action.task._id]: action.task}
        case ADD_TASKS:
            return {...action.tasks}
        case REMOVE_TASK:
            delete newState[action.payload.taskId]
            return newState
        case ADD_PROJECT:
            // debugger;
            const taskArray = action.project.tasks;
            taskArray?.forEach(task=>{
                newState[task._id] = task;
                newState[task._id].projectId = action.project._id;
            })
            return newState;
        case ADD_PROJECTS:
            const projectArray = action.projects;
            projectArray?.forEach(project=>{
                const taskArray = project.tasks;
                taskArray?.forEach(task =>{
                    newState[task._id] = task;
                    newState[task._id].projectId = project._id;
                })
            })
            return newState;
        case PURGE_TASKS:
            return defaultState;
        default:
            return state;
    }
}

export default taskReducer;

export const getTask = (taskId) => (state) => {
    if (state.tasks) {
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
        console.log(data,"task data")
        dispatch(addTask(data));
    }
}

export const updateTask = (projectId,task)=> async dispatch =>{
    let res = await jwtFetch(`/api/projects/${projectId}/tasks/${task._id}`,{
        method: "PATCH",
        body: JSON.stringify(task),
        headers: {
            'Content-Type':'application/json'
        }
    });
    if(res.ok){
        let data = await res.json();
        console.log(data,"update task data")
        dispatch(addTask(data));
    }
}

export const deleteTask = (projectId,taskId)=>async dispatch =>{
    let res = await jwtFetch(`/api/projects/${projectId}/tasks/${taskId}`,{
        method: "DELETE",
    })
    if(res.ok){
        dispatch(removeTask({
            projectId,
            taskId
        }));
    }
}
