import React, {useRef, useState} from "react";
import { Auth } from "../Auth";
import Cookies from "universal-cookie";
import {Chat} from './Chat'

const cookies = new Cookies();

function Chatroom(){
    const[room, setRoom] = useState();

    const roomInputRef = useRef(null);
    return(
        <div>
            {room ? (
                <Chat room={room}/>
            ) : (
                <div className="room">
                    <label>Enter room name: </label>
                    <input ref={roomInputRef}/>
                    <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
                </div>
            )}{" "}
        </div>
    )
}

export default Chatroom;