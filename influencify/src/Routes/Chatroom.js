import React, {useRef, useState, useEffect} from "react";
import { Auth } from "../Auth";
import Cookies from "universal-cookie";
import {Chat} from './Chat'
import { addDoc, collection, onSnapshot, query, serverTimestamp, where, orderBy } from "firebase/firestore";
import { auth, db } from "../Config/firebase-config";

const cookies = new Cookies();

function Chatroom(){
    const roomRef = collection(db, "rooms");
    const[newRoom, setNewRoom] = useState();
    const[room, setRoom] = useState('');
    const [chatRooms, setChatRooms] = useState([]);
    const createRoom = async(e) =>{
        e.preventDefault();
        if(newRoom == "") return;

        await addDoc(roomRef, {
            room_owner: auth.currentUser.displayName,
            room_name: newRoom
        })
        setNewRoom('');
    };

    const changeRoom = (roomname) =>{
         // Set room to empty temporarily
    setRoom('');
    // setRoom(roomname);
    // After a short delay, set room to the desired value
    setTimeout(() => {
        setRoom(roomname);
    }, 100); // Adjust the delay as needed
    }

    useEffect(()=>{
        const queryChatRooms = query(roomRef, where("room_name", "!=", ''));
        const viewChatRooms = onSnapshot(queryChatRooms, (snapshot) => {
            let chatRooms = [];
            snapshot.forEach((doc) => {
                chatRooms.push({...doc.data(), id: doc.id});
            });
            setChatRooms(chatRooms);
        });

        return () => viewChatRooms();
    }, []);

    const roomInputRef = useRef(null);
    return(
        <div>
            <form onSubmit={createRoom}>
                <input placeholder="Choose Room Name" onChange={(e) => setNewRoom(e.target.value)} value={newRoom}/>
                <button type="submit">Submit</button>
            </form>

            <button onClick={()=> setRoom()}>Reset Room</button>
            
            {room ? (
                <Chat room={room}/>
            ) : (<div></div>)}

                {/* <div className="room">
                    <label>Enter room name: </label>
                    <input ref={roomInputRef}/>
                    <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
                </div> */}

            <div>
                {chatRooms.map((chatRoom) => (
                    <div key={chatRoom.id}>
                        <button ref={roomInputRef} onClick={()=>changeRoom(chatRoom.room_name)}>{chatRoom.room_name}</button>
                    </div>
                ))}
            </div>

            {/* {room && (
                <div>
                    <Chat room={room} />
                </div>
            )} */}
        </div>
    )
}

export default Chatroom;