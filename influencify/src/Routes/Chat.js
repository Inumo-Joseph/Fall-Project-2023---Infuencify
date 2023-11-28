import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, query, serverTimestamp, where, orderBy } from "firebase/firestore";
import { auth, db } from "../Config/firebase-config";
import '../Styles/Chat.css'

export const Chat = ( {room} ) =>{
    const[newMessage, setNewMessage] = useState('');
    const messagesRef = collection(db, "messages");
    const [messages, setMessages] = useState([]);

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

    return(
        <div>
            <div>
                <h1>Welcome To: {room}</h1>
            </div>
            <div className="messageContainer"> 
                {messages.map((message) => (
                    <div key={message.id}>
                        <h3 className="messageUser">{message.user}</h3>
                        <p>{message.text}</p>
                        <p>Date: {message.createdAt?.toDate().toString()}</p>
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