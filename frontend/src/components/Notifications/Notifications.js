import { useSelector } from "react-redux";
import { getUser } from "../../store/session";
import { useEffect } from "react";
import io from "socket.io-client"

function Notifications () {
    const userId = useSelector(getUser)
    let socket;
    useEffect(()=>{
        socket = io('http://localhost:5001');
        socket.on("connect", ()=>{
            console.log("connection")
            
        });
    return ()=>{socket.disconnect()}
    },[socket])

    useEffect(()=>{
        socket.on('greetings',(greeting)=>{
            console.log(greeting,"greeting")
        })
    },[socket])
    
    const handleClick = (e)=>{
        e.preventDefault();
        socket.emit('message', "Hey!")
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