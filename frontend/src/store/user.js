import jwtFetch from "./jwt";
import {addTasks} from "."

export const fetchUser = (userId) => async dispatch =>{
    let res = await jwtFetch(`/api/users/${userId}`)
    if(res.ok){
        let data = await res.json();
        dispatch(addTasks(data.tasks));
        dispatch(addProjects(data.projects))
    }
}