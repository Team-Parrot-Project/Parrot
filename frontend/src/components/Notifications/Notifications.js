import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/session";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import * as userActions from "../../store/user"
import * as notificationActions from "../../store/notification"
import * as projectActions from "../../store/project"
import { fetchNotifications } from "../../store/notification";
import socket from "./socket";


function Notifications () {
    const dispatch = useDispatch();
    const userId = useSelector(getUser)
    const [messages,setMessages] = useState([])
    const projects = useSelector(projectActions.getProjects)
    const notifications = useSelector(notificationActions.getNotifications)
    console.log("Re-Rendered")

    useEffect(()=>{
        dispatch(userActions.fetchUser(userId))
        dispatch(notificationActions.fetchNotifications(userId))
    },[dispatch,userId])

    useEffect(()=>{
        //Eventually refactor to join appropriate room channels
        
        socket.on("connect", ()=>{
            console.log("connection")
            socket.emit('join-channel',`${userId}`)
            if(projects){
                projects.forEach((project)=>{
                    let projectId = project._id
                    socket.emit('join-channel',projectId);
                })
            }
        });
        
        socket.on('message',(input)=>{
            console.log(input,"message")
            dispatch(notificationActions.addNotification(input))
        })
        
    return ()=>{socket.disconnect()}
    },[socket,projects,userId,dispatch])

    useEffect(()=>{
        setMessages([...notifications])
    },[notifications])

    return(
        <div>
            {messages.map((message)=>{
                return <div>{message.message}</div>
            })}
        </div>
    )
};

export default Notifications