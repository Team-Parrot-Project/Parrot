import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/session";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import * as userActions from "../../store/user"
import * as notificationActions from "../../store/notification"
import * as projectActions from "../../store/project"

// import socket from "./socket";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./Notifications.css";


function Notifications () {
    const dispatch = useDispatch();
    const userId = useSelector(getUser)
    const [messages,setMessages] = useState([])
    const projects = useSelector(projectActions.getProjects)
    const notifications = useSelector(notificationActions.getNotifications)
    console.log("Re-Rendered")
    // const socket = io('http://localhost:5001');
    useEffect(()=>{
        dispatch(userActions.fetchUser(userId))
        dispatch(notificationActions.fetchNotifications(userId))
    },[dispatch,userId])

    useEffect(()=>{
        console.log("in socket")
        let socket = io('http://localhost:5001');
        //Eventually refactor to join appropriate room channels
        socket.on('connect',()=>{
            console.log(socket.id,"connection")
            
        })
        console.log(projects,"projects")
        if(projects){
            projects.forEach((project)=>{
                let projectId = project._id
                socket.emit('join-channel',projectId);
            })
        }
        socket.on('message',(input)=>{
            console.log(input,"message")
            dispatch(notificationActions.addNotification(input))
        })

        
    return ()=>{socket.disconnect()}
    },[userId,dispatch,projects])

    useEffect(()=>{
        
    },[projects])

    

    useEffect(()=>{
        setMessages([...notifications])
    },[notifications])

    const handleDelete = (e,messageId)=> {
        console.log([userId,messageId],"click event messageId");
        dispatch(notificationActions.deleteNotification(userId,messageId));
    }
    return(
        <div className="notificationHub">
            {messages.map((message)=>{
                return <div className="messageWrapper" key={message._id}>
                 <div className="notificationMessage">{message.message}</div>
                 <div className="notificationX" onClick={(e)=>{handleDelete(e,message._id)}}><IoIosCloseCircleOutline size={15}/></div>
                 </div>
            })}
        </div>
    )
};

export default Notifications