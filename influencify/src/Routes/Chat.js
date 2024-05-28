import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, query, serverTimestamp, where, orderBy, getDocs, doc, deleteDoc} from "firebase/firestore";
import { auth, db } from "../Config/firebase-config.js";
import '../Styles/Chat.css'

export const Chat = ( {room} ) =>{
    const[newMessage, setNewMessage] = useState('');
    const[newBan, setNewBan] = useState('');
    const messagesRef = collection(db, "messages");
    const bannedRef = collection(db, "banned-users");
    const roomRef = collection(db, "rooms");
    const [messages, setMessages] = useState([]);
    let banned_array = [];
    let owner_array = [];

    useEffect(()=>{
        const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
        const viewMessages = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            });
            setMessages(messages);
        });

        return () => viewMessages();
    }, []);

    const banUser = async(e) =>{
        e.preventDefault();

        if(newBan == "") return;

        const userOwner = await isUserOwner();
        const userBanned = await isUserBanned(newBan, room);

        if(!userOwner) return;

        if(userBanned){
            return;
        }

        await addDoc(bannedRef, {
            room,
            username: newBan
        });

        setNewBan('');
    }
    // const deleteRoom = async() =>{
    //     const userOwner = await isUserOwner();
    //     console.log(messages);
    //     if(!userOwner) return;
    //     while(messages.length != 0){
    //         await deleteDoc(doc(db, "messages", messages[0].id));
    //     }
    // }

    const isUserBanned = async(user_name, room_name) =>{
        banned_array = [];
        const banned_query = query(bannedRef, where("username","==", user_name), where("room","==",room_name));
        const banned_snapshot = await getDocs(banned_query);

        banned_snapshot.forEach((doc) =>{
            banned_array.push({...doc.data(), id:doc.id});
        });
        console.log(banned_array);
        return banned_array.length != 0;
    }

    const isUserOwner = async() =>{
        owner_array = [];
        const ownerQuery = query(roomRef,where("room_owner", "==", auth.currentUser.displayName),where("room_name", "==", room));
        const ownerSnapshot = await getDocs(ownerQuery);
        
        ownerSnapshot.forEach((doc) =>{
            owner_array.push({...doc.data(), id:doc.id});
            if(owner_array.length == 0){
                return false;
            }
            return true;
        })
        return ownerSnapshot.size > 0;
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(newMessage == "") return;
        
        await addDoc(messagesRef, {
            text: newMessage, 
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room
        })
        
        setNewMessage('');
    };

    const enterKey = (e) =>{
        if(e.key == 'Enter'){
            handleSubmit(e);
        }
    };

    const deleteMessage = async(message_id, user) =>{
        const userOwner = await isUserOwner();
        if((user != auth.currentUser.displayName) && !userOwner) return;
        await deleteDoc(doc(db, "messages", message_id));
    }

    // const editMessage = async(message_id, user, time) =>{
    //     if(user != auth.currentUser.displayName) return;
    //     await add Doc(messagesRef, )
    // }

    return(
        <div>
            <div>
                <h1>Welcome To: {room}</h1>
                {/* <button onClick={()=> deleteRoom}>Delete Room</button> */}
                <form onSubmit={banUser}>
                    <input className="ban-input" placeholder="User to ban" onChange={(e) => setNewBan(e.target.value)} value={newBan}/>
                    <button type="submit" className="send-button"> Ban User </button>
                </form>
            </div>
            <div className="messageContainer"> 
                {messages.map((message) => (
                    <div key={message.id}>
                        <h3 className="messageUser">{message.user}</h3>
                        <p>{message.text}</p>
                        <p>Date: {message.createdAt?.toDate().toString()}</p>
                        <button onClick={() => deleteMessage(message.id, message.user)}>Delete</button>
                    </div>
                ))}
            </div>

            
            <form onSubmit={handleSubmit} className="new-message-form">
                <input className="new-message-input" placeholder="Type your message" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} onKeyDown={enterKey}/>
                <button type="submit" className="send-button"> Send </button>
            </form>
        </div>
    )
};

export default Chat;