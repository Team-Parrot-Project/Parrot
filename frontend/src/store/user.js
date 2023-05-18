import jwtFetch from "./jwt";
import {addTasks} from "./task";
import {addProjects} from "./project";

export const ADD_USERS = 'user/addUsers';

export function addUsers(users) {
    return {
        type: ADD_USERS,
        users
    }
}

export const fetchUser = (userId) => async dispatch =>{
    let res = await jwtFetch(`/api/users/${userId}`)
    if(res.ok){
        let data = await res.json();
        console.log(data,"Assgined Tasks")
        dispatch(addProjects(data.projects));
    }
}

export function fetchUsers () {
    return async function (dispatch) {
        let res = await jwtFetch(`/api/users/`)
        let data = await res.json();
        return dispatch(addUsers(data));
    }
}

const userReducer = (state = {}, action) => {
    const newState = {...state};

    switch (action.type) {
        case ADD_USERS:
            const users = action.users;
            const newUsers = {};
            users.forEach(user => {
                newUsers[user._id] = user;
            });
            return newUsers;
        default:
            return state;
    }
}

export default userReducer;