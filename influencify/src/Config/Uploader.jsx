import { useState, React} from 'react';

import { storage} from './firebase-config';
import { ref, getDownloadURL,uploadBytesResumable  } from "firebase/storage";
import {db} from "./firebase-config";
import { doc, setDoc, collection } from "firebase/firestore";


 function  Uploader() { 

    const [file, setfile] = useState(null)
   
    const handleClick = async () => {


    try {

    
        const videosCollection = collection(db);
        
        const newDocRef = doc(videosCollection);
        // Set document data
        await setDoc(newDocRef, {
          name: "Test-Video",
          username: "Pizza",
          genre: "Cooking",
          videoUrl:""
        });
    
        console.log("Video Doc added");
      } catch (error) {
        console.error("ERROR ", error.message);
      }
    }
 
    return (

<div className="Upload"> 
    <form className= "form">
    <input type ="file"></input>
    <br></br>
    <button type="submit" onClick={ () => handleClick () }>
    UPLOAD 
    </button>
    </form>

</div>



);

    }

export default Uploader;