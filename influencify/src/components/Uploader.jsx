import { useState, React} from 'react';
import { ref, getDownloadURL,uploadBytesResumable, updateMetadata  } from "firebase/storage";
import { db, storage, auth} from "./firebase-config";
import { doc, setDoc, collection} from "firebase/firestore";
import { getAuth, onStateChanged} from "firebase/auth";
import { label }  from '@mui/icons-material';

function Uploader() {

    const Auth = getAuth();
    const user= Auth.currentUser;
    const displayName="User-Name";

    {/*
    if(user.displayName === null)
    {
       displayName="User-Name";
    }
    else{
       displayName=user.displayName;
    }
    */}

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [username, setUsername] = useState('');
    const [genre, setGenre] = useState('');
    const [url, setUrl] = useState('');
  

    const handleClick = async () => {
      try {
        if (file === null) {
         { console.log('Insert file')
          return; // Return early if no file is selected
        }
        }
  
        const fileRef = ref(storage, `videos/${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);
        const newMetadata ={
            name: fileRef.name,
            size: fileRef.size,
            timeCreated: fileRef.timeCreated,
            customMetadata:{
                "Video-tags": genre,
                
            }
        };

        uploadTask.on('state_changed', (snapshot) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        }, (error) => {
          console.log(error.message);
        }, async () => {
          console.log('success!!');
  
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
            const videosCollection = collection(db, 'videos');
            const newDocRef = doc(videosCollection);
  
            // Set document data
            await setDoc(newDocRef, {
              Title: title,
              username: username,
              genre: genre,
              videoUrl: downloadURL, // Use the downloadURL obtained earlier
            }, {merge: true} );
            
            

  
            // Reset state variables to clear the fields
            setTitle('');
            setUsername('');
            setGenre('');
            setFile(null);
            setUrl('');
  
            console.log('ADDED DOC');
          }
          catch (error) {
            console.error('ERROR WITH DOC ', error.message);
          }

          updateMetadata(fileRef, newMetadata)
        .then((metadata) => {
            console.log('Metadata updated successfully', metadata);
         }).catch((error) => {
             console.log("ERROR WITH METADATA", error.message)
           });

           
        });

        

      } catch (error) {
        console.error('ERROR IN TRY', error.message);
      }
     
       
    };
  
    return (
      <div className="Upload">
        <form className="form">
        <label>
            USERNAME:{()=>setUsername(username.concat(displayName))}
          </label> 
          <label>
            {displayName}
          </label>
          <br />
          <label>
            VIDEO TITLE:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <br />
          
          <label>
            TAGS:
            <br/>
             <button onClick= {() =>setGenre(genre.concat(" Educational"))} >
              Educational
             </button>
             

             <button onClick= {() =>setGenre(genre.concat(" Sports"))} >
              Sports
             </button>

             <button onClick= {() => setGenre(genre.concat(" Beauty"))} >
              Beauty
             </button>

             <button onClick= {() => setGenre(genre.concat(" Fashion"))} >
              Fashion
             </button>

             <button onClick= {() => setGenre(genre.concat(" Comedy"))} >
              Comedy
             </button>

             <button onClick= {() => setGenre(genre.concat(" Family"))} > 
              Family
             </button>
             <br/>
          
          </label>
          <br />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <br />

          <button type="button" onClick={handleClick}>
            UPLOAD
          </button>
        </form>
      </div>
    );
  }
       

export default Uploader; 