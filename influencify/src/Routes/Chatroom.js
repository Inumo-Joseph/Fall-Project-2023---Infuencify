import React, {useRef, useState, useEffect} from "react";
import { Auth } from "../Auth";
import {Chat} from './Chat'
import { addDoc, collection, onSnapshot, query, serverTimestamp, where, orderBy, getDocs } from "firebase/firestore";
import { auth, db } from "../Config/firebase-config";
import '../Styles/Chatroom.css';
import HeaderTrainer from "../Components_TRUE/Header-Trainer";

function Chatroom(){
    const roomRef = collection(db, "rooms");
    const[newRoom, setNewRoom] = useState();
    const[room, setRoom] = useState('');
    const [chatRooms, setChatRooms] = useState([]);
    let banned_array = [];
    const createRoom = async(e) =>{
        e.preventDefault();
        if(newRoom == "") return;

        await addDoc(roomRef, {
            room_owner: auth.currentUser.displayName,
            room_name: newRoom
        })
        setNewRoom('');
    };

    const changeRoom = async (roomname) =>{
    const banState = await isUserBanned(auth.currentUser.displayName, roomname);
    if(banState){
        console.log("User is banned");
        return;
    }
    setRoom('');
    setTimeout(() => {
        setRoom(roomname);
    }, 100); 
    }

    const isUserBanned = async(user_name, room_name) =>{
        banned_array = [];
        const bannedRef = collection(db, "banned-users");
        const banned_query = query(bannedRef, where("username","==", user_name), where("room","==",room_name));
        const banned_snapshot = await getDocs(banned_query);

        banned_snapshot.forEach((doc) =>{
            banned_array.push({...doc.data(), id:doc.id});
        });
        console.log(banned_array);
        return banned_array.length != 0;
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
            <HeaderTrainer></HeaderTrainer>
            <h1>Start Chatting </h1>
            <h2>Create a New Room</h2>
            <form onSubmit={createRoom}>
                <input className="createRoom-box" placeholder="Create Room, Enter a Name For New Room" onChange={(e) => setNewRoom(e.target.value)} value={newRoom}/>
                <button type="submit">Submit</button>
            </form>

            {/* <button onClick={()=> setRoom()}>Reset Room</button> */}

            <div className="chatplace-div">
                <div className="list-chats">
                    {chatRooms.map((chatRoom) => (
                        <div key={chatRoom.id}>
                            <button className='room-button' ref={roomInputRef} onClick={()=>changeRoom(chatRoom.room_name)}>{chatRoom.room_name}</button>
                        </div>
                    ))}
                </div>
                <div className="room-div">
                    {room ? (
                        <Chat room={room}/>
                    ) : (<div></div>)}
                </div>
            </div>
        </div>
    )
}

export default Chatroom;
