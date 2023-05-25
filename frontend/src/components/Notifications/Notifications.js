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
import { useHistory } from "react-router-dom/cjs/react-router-dom";


function Notifications () {
    const dispatch = useDispatch();
    const userId = useSelector(getUser)
    const [messages,setMessages] = useState([])
    const projects = useSelector(projectActions.getProjects)
    const notifications = useSelector(notificationActions.getNotifications)
    const [toggleNav,setToggleNav] = useState(false);
    const [toggleBadge,setToggleBadge] = useState(false);
    const history = useHistory();
    const PORT = process.env.PORT || 5003;

    useEffect(()=>{
        if(messages.length > 0){
            setToggleBadge(true)
        }else{
            setToggleBadge(false)
        }
    },[messages])


    useEffect(()=>{
        dispatch(userActions.fetchUser(userId))
        dispatch(notificationActions.fetchNotifications(userId))
    },[dispatch,userId])

    useEffect(()=>{
        console.log("in socket")
        let socket = io(`http://localhost:${PORT}`);
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

    const handleToggle = (e)=>{
        e.preventDefault();
        if(toggleNav){
            setToggleNav(false)
            dispatch(notificationActions.purgeNotifications())
        }else{
            setToggleNav(true)
        }
    }


    return(
        <div className="notifications-mainwrapper">
            <div className="notifications-title" onClick={handleToggle}>
            <div className="nav-wrapper">
              <svg className="nav-icon" viewBox="0 0 40 40">
                <path d="M7.5,32L7.5,32h-1c-1.5,0-2.8-0.8-3.4-2c-0.8-1.5-0.4-3.4,0.9-4.5c1.2-1,1.9-2.4,2-3.9v-6.1C6,8.1,12.3,2,20,2s14,6.1,14,13.5V22c0.2,1.4,0.9,2.6,2,3.5c1.3,1.1,1.7,2.9,0.9,4.5c-0.6,1.2-2,2-3.4,2h-0.9H7.5z M7.6,29h25.8c0.3,0,0.7-0.2,0.8-0.4c0.2-0.4,0-0.7-0.2-0.8l0,0c-1.6-1.4-2.7-3.3-3-5.5c0-0.1,0-0.1,0-0.2v-6.6C31,9.7,26.1,5,20,5S9,9.7,9,15.5v6.1v0.1c-0.2,2.4-1.3,4.5-3.1,6c-0.2,0.2-0.3,0.5-0.2,0.8C5.9,28.8,6.2,29,6.5,29H7.6L7.6,29z M24.7,34c-0.7,1.9-2.5,3.2-4.7,3.2s-4-1.3-4.7-3.2H24.7z">
                </path>
              </svg>
              <span className="nav-text">Notifications</span>
            </div>
            {toggleBadge && <div className="notification-count">
            {messages.length} 
            </div>} 
            </div>
            {toggleNav && <div className="notificationHub">
                {messages.map((message)=>{
                    return (
                    <div className="messageWrapper" key={message._id}>
                    <div className="notificationMessage" onClick={()=>{history.push(`/projects/${message.project}`)}}>{message.message}</div>
                    <div className="notificationX" onClick={(e)=>{handleDelete(e,message._id)}}><IoIosCloseCircleOutline size={15}/></div>
                    </div>)
                })}
            </div>}
        </div>
    )
};

export default Notifications