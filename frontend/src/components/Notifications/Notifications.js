import { useSelector } from "react-redux";
import { getUser } from "../../store/session";
import { useEffect } from "react";
import io from "socket.io-client"

function Notifications () {
    const userId = useSelector(getUser)
    let socket;
    useEffect(()=>{
        //Eventually refactor to join appropriate room channels
        socket = io('http://localhost:5001');
        socket.on("connect", ()=>{
            console.log("connection")
            socket.emit("join-channel",userId)
        });
    return ()=>{socket.disconnect()}
    },[])

    useEffect(()=>{
        //Listener from server
        //Refactor to handle receiving notifications from backend
        socket.on('message',(message)=>{
            console.log(message,"message")
        })
    },[socket])
    
    const handleClick = (e)=>{
        e.preventDefault();
        socket.emit('message', "Hey!")
        socket.emit("join-channel",userId)
    }

    return(
        <div>
            <button onClick={handleClick}>
            {`${userId}`}
            </button>
        </div>
    )
};

export default Notifications