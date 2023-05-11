import jwtFetch from "./jwt";
import {addTasks} from "./task";
import {addProjects} from "./project";

export const fetchUser = (userId) => async dispatch =>{
    let res = await jwtFetch(`/api/users/${userId}`)
    if(res.ok){
        let data = await res.json();
        console.log(data,"Assgined Tasks")
        dispatch(addProjects(data.projects));
    }
}