import jwtFetch from "./jwt";

export const ADD_PROJECT = 'project/addProject';
const ADD_PROJECTS = 'project/addProjects'
const REMOVE_PROJECT = 'project/removeProject';

export const addProject = (project)=>{
    console.log(project)
    return {
        type: ADD_PROJECT,
        project: project
    }
}

export const addProjects = (projects)=>{
    return {
        type: ADD_PROJECTS,
        projects: projects
    }
}

export const removeProject = (projectId)=>{
    return {
        type: REMOVE_PROJECT,
        projectId: projectId
    }
}

export const projectReducer = (state = {},action) =>{
    const newState = {...state};
    switch(action.type){
        case ADD_PROJECT:
            console.log(action)
            return {...state, [action.project._id]: action.project}
        case ADD_PROJECTS:
            return {...action.projects}
        case REMOVE_PROJECT:
            delete newState[action.projectId]
            return newState
        default:
            return state;
    }
}

export default projectReducer;

export const getProject = (projectId) => (state)=>{
    if(state.projects){
        return state.projects[projectId]
    }else{
        return null;
    }
}

export const getProjects = (state)=>{
    if(state.projects){
        return Object.values(state.projects)
    }else{
        return [];
    }
}

export const fetchProject = (projectId) => async dispatch=>{
    let res = await jwtFetch(`/api/projects/${projectId}`)
    if(res.ok){
        let data = await res.json();
        dispatch(addProject(data[projectId]));
    }
}

export const createProject = (project)=>async dispatch =>{
    let res = await jwtFetch(`/api/projects/`,{
        method: "POST",
        body: JSON.stringify(project),
        headers: {
            'Content-Type':'application/json'
        }
    })
    if(res.ok){
        let data = await res.json();
        dispatch(addProject(data));
    }
}

export const updateProject = (project)=> async dispatch =>{
    let res = await jwtFetch(`/api/projects/${project.id}`,{
        method: "PATCH",
        body: JSON.stringify(project),
        headers: {
            'Content-Type':'application/json'
        }
    });
    if(res.ok){
        let data = await res.json();
        dispatch(addProject(data));
    }
}

export const deleteProject = (projectId)=>async dispatch =>{
    let res = await jwtFetch(`/api/projects/${projectId}`,{
        method: "DELETE",
    })
    if(res.ok){
        dispatch(removeProject(projectId));
    }
}
