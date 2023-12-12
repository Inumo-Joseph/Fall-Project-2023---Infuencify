import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, query, serverTimestamp, where, orderBy, getDocs, doc, deleteDoc} from "firebase/firestore";
import { auth, db } from "../Config/firebase-config";
import '../Styles/Comments.css'

const Comments = ( {video_title} ) =>{

    const commentsRef = collection(db, 'comments');
    const likesRef = collection(db, 'likes');
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(()=>{
        const queryComments = query(commentsRef, where("video_title", "==", video_title), orderBy("createdAt"));
        const viewComments = onSnapshot(queryComments, (snapshot) =>{
            let comments = [];
            snapshot.forEach((doc) =>{
                comments.push({...doc.data(), id: doc.id});
            });
            setComments(comments);
        });
        
        return () => viewComments();
    }, []);

    const createComment = async(e) =>{
        e.preventDefault();

        if(newComment == '') return;

        await addDoc(commentsRef, {
            content: newComment,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            video_title
        });

        setNewComment('');
        {console.log("COMMENT", newComment)}
    }

    const addLike = async(comment_id) =>{
        const isLikedAlready = isLikedByUser(comment_id);
        if(isLikedAlready){
            await deleteDoc(doc(db, "likes", comment_id));
        }
        await addDoc(likesRef, {
            comment_id,
            user: auth.currentUser.displayName
        });
    }

    const isLikedByUser = async(comment_id) =>{
        let likedByUser = [];
        const likedByUserQuery = query(likesRef, where("comment_id", "==", comment_id), where("user", "==", auth.currentUser.displayName));
        const likedByUserSnapshot = await getDocs(likedByUserQuery);

        likedByUserSnapshot.forEach((doc) =>{
            likedByUser.push({...doc.data(), id:doc.id});
        });

        return likedByUser.length != 0;
    }

    const getNumLikes = async(comment_id) =>{
        let commentLikes = [];
        const commentIsLikedQuery = query(likesRef, where("comment_id", '==', comment_id));
        const commentIsLikedQuerySnapshot = await getDocs(commentIsLikedQuery);

        commentIsLikedQuerySnapshot.forEach((doc) =>{
            commentLikes.push({...doc.data(), id:doc.id});
        });

        return commentLikes.length;
    }

    return(
        <div>
            <div>
                <form onSubmit={createComment}>
                    <input placeholder="Type your Comment" onChange={(e) => setNewComment(e.target.value)} value={newComment} />
                    <button type="submit" className="send-button"> Send </button>
                </form>
                
            </div>
            <div className="Comment-Container">
    
                {comments.map((comment) => (
                    <div key={comment.id} className="single-comment">
                        <h5>{comment.user}</h5>
                        <p>{comment.content}</p>
                        {/* <div>
                            <p>{numLikes[comment.id]}</p>
                            <button onClick={() => addLike(comment.id)}> Like </button>
                        </div> */}
                        
                    </div>
                  

                ))}
            </div>
           
        </div>
        
    )
};

export default Comments;