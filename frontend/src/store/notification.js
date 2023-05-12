import jwtFetch from "./jwt";

const ADD_NOTIFICATIONS = 'Notification/addNotifications'
const ADD_NOTIFICATION = 'Notification/addNotification'
const REMOVE_NOTIFICATION = 'Notification/removeNotification'

export const addNotification = (notification) => {
    return {
        type: ADD_NOTIFICATION,
        notification: notification
    }
}

export const addNotifications = (notifications) => {
    return {
        type: ADD_NOTIFICATIONS,
        notifications: notifications
    }
}

export const removeNotification = (notificationId) => {
    return {
        type: REMOVE_NOTIFICATION,
        notificationId: notificationId
    }
}

export const notificationReducer = (state = {}, action) => {
    const newState = {...state};

    switch(action.type){
        case ADD_NOTIFICATION:
            return {...state, [action.notification._id]: action.notification}
        case ADD_NOTIFICATIONS:
            action.notifications.forEach(notification => {
                newState[notification._id] = notification
            })
            return newState
        case REMOVE_NOTIFICATION:
            delete newState[action.notificationId]
            return newState;
        default:
            return state;
        }

}

export default notificationReducer;

export const getNotifications = (state) => {
    if(state.notifications){
        return Object.values(state.notifications)
    }else{
        return [];
    }
}

export const fetchNotifications = (userId) => async dispatch =>{
    let res = await jwtFetch(`/api/notifications/${userId}`)
    if(res.ok){
        let data = await res.json();
        dispatch(addNotifications(data))
    }
}

export const deleteNotification = (userId,notificationId) => async dispatch =>{
    console.log([userId,notificationId],"trying to delete")
    let res = await jwtFetch(`/api/notifications/${userId}/${notificationId}`,{
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        }
    })
    console.log(res,"res")
    if(res.ok){
        console.log(res,"res in deleteNotif")
        dispatch(removeNotification(notificationId))
    }
}


