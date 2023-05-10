import jwtFetch from "./jwt";
import {addTasks} from "./task";
import {addProjects} from "./project";

export const fetchUser = (userId) => async dispatch =>{
    let res = await jwtFetch(`/api/users/${userId}`)
    if(res.ok){
        let data = await res.json();
        dispatch(addTasks(data.assignedTasks));
        dispatch(addProjects(data.projects));
    }
}