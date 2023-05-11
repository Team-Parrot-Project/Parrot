import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/session";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import * as userActions from "../../store/user"
import * as projectActions from "../../store/project"

function Notifications () {
    const dispatch = useDispatch();
    const userId = useSelector(getUser)
    const [messages,setMessages] = useState([])
    const projects = useSelector(projectActions.getProjects)
    let socket;

    useEffect(()=>{
        dispatch(userActions.fetchUser(userId))

    },[dispatch])

    useEffect(()=>{
        //Eventually refactor to join appropriate room channels
        socket = io('http://localhost:5001');
        socket.on("connect", ()=>{
            console.log("connection")
            socket.emit('join-channel',`${userId}`)
        });
        if(projects){
            projects.forEach((project)=>{
                let projectId = project._id
                socket.emit('join-channel',projectId);
            })
        }
        
    return ()=>{socket.disconnect()}
    },[socket])

    useEffect(()=>{
        //Listener from server
        //Refactor to handle receiving notifications from backend
        socket.on('message',(input)=>{
            console.log(input,"message")
            messages.push(input)
        })
    },[socket])

    return(
        <div>
            {messages.map((message)=>{
                return <div>{message}</div>
            })}
        </div>
    )
};

export default Notifications