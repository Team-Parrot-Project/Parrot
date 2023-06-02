import jwtFetch from "./jwt";
import { ADD_TASK, REMOVE_TASK } from "./task";

export const ADD_PROJECT = 'project/addProject';
export const ADD_PROJECTS = 'project/addProjects'
const REMOVE_PROJECT = 'project/removeProject';

export const addProject = (project) => {
    return {
        type: ADD_PROJECT,
        project: project
    }
}

export const addProjects = (projects) => {
    return {
        type: ADD_PROJECTS,
        projects: projects
    }
}

export const removeProject = (projectId) => {
    return {
        type: REMOVE_PROJECT,
        projectId: projectId
    }
}

export const projectReducer = (state = {}, action) => {
    const newState = { ...state };
    let projectId;
    let taskArray;
    let existingIdx;

    switch (action.type) {
        case ADD_PROJECT:
            return { ...state, [action.project._id]: action.project }
        case ADD_PROJECTS:
            const projects = action.projects;
            projects.forEach(project => {
                newState[project._id] = project
            })
            return newState
        case REMOVE_PROJECT:
            delete newState[action.projectId]
            return newState;
        case REMOVE_TASK:
            taskArray = newState[action.payload.projectId].tasks;
            existingIdx = taskArray.findIndex((ele) => {
                // debugger;
                return ele._id === action.payload.taskId
            })

            if (existingIdx >= 0) {
                taskArray.splice(existingIdx, 1);
                newState[action.payload.projectId].tasks = taskArray;
            }
            // debugger;
            return newState;
        case ADD_TASK:
            projectId = action.task.projectId;
            taskArray = newState[projectId].tasks;

            existingIdx = taskArray.findIndex((ele) => {
                return ele._id === action.task._id
            })

            if (existingIdx < 0) {
                taskArray.push(action.task)
            } else {
                taskArray[existingIdx] = action.task;
            }

            newState[projectId].tasks = taskArray;
            return newState;
        default:
            return state;
    }
}

export default projectReducer;

export const getProject = (projectId) => (state) => {
    if (state.projects) {
        return state.projects[projectId]
    } else {
        return null;
    }
}

export const getProjects = (state) => {
    if (state.projects) {
        return Object.values(state.projects)
    } else {
        return [];
    }
}

export const getProjectTasks = (projectId) => (state) => {
    if (state.projects && state.projects[projectId]) {
        return Object.values(state.projects[projectId].tasks)
    } else {
        return [];
    }
}

export const fetchProject = (projectId) => async dispatch => {
    let res = await jwtFetch(`/api/projects/${projectId}`)
    if (res.ok) {
        let data = await res.json();

        return dispatch(addProject(data[projectId]));
    } else {
        debugger;
        return res.errors;
    }
}

export const createProject = (project) => async dispatch => {
    let res = await jwtFetch(`/api/projects/`, {
        method: "POST",
        body: JSON.stringify(project),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        let data = await res.json();
        dispatch(addProject(data));
    }
}

export const updateProject = (project) => dispatch => {
    jwtFetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        body: JSON.stringify(project),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json()
    }).then((data) => {
        dispatch(addProject(data))
    })
}

export const deleteProject = (projectId) => async dispatch => {
    let res = await jwtFetch(`/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        dispatch(removeProject(projectId));
    }
}
