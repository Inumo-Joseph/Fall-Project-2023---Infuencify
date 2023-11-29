import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from '../components/firebase-config';


export const Chat = (props) =>{
    const[newMessage, setNewMessage] = useState('');
    const messagesRef = collection(db, "messages");
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        const queryMessages = query(messagesRef, where("room", "==", props));
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
            room: props
        })
        
        setNewMessage('');
    };

    return(
        <div>
            <div> {messages.map((message) => <h1>{message.text}</h1>)}</div>
            <form onSubmit={handleSubmit} className="new-message-form">
                <input className="new-message-input" placeholder="Type your message" onChange={(e) => setNewMessage(e.target.value)} value={newMessage}/>
                <button type="submit" className="send-button">
                </button>
            </form>
        </div>
    )
};

export default Chat;