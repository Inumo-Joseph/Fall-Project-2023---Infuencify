import { useState, React} from 'react';
import { ref, getDownloadURL,uploadBytesResumable, updateMetadata  } from "firebase/storage";
import { auth, db, storage} from "../Config/firebase-config";
import { doc, setDoc, collection} from "firebase/firestore";
import { useAuth} from "../contexts/AuthContext";
import { label }  from '@mui/icons-material';

function Uploader() {
//Uploads a doc and a video onto fire base store and videos into storage

    const { currentUser, logout } = useAuth();// gets the current user information
    const name =currentUser.displayName; //set the variable to the current user informtino name
     // All of the informatino about the video that will be uploaded is saved as variables
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [username, setUsername] = useState(auth.currentUser.displayName);
    const [genre, setGenre] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');

    {/*
    
    */}

    
  

    const handleClick = async () => {
       {/*
      async hanlde click funtion that uploads a filled out doc to firestore and a video to storage
    */}
      try {
        if (file === null) { // if the file is null
         { console.log('Insert file')
          return; // Return early if no file is selected
        }
        }
  
        const fileRef = ref(storage, `videos/${file.name}`); //reference to storage bucket
        const uploadTask = uploadBytesResumable(fileRef, file); // uploads the file to the storage bucket using uploadBytesResumable function
        
        //new Metadat object is created. This can be added to rh evideo and later manipulated 
       
        const newMetadata ={
            name: fileRef.name,
            size: fileRef.size,
            timeCreated: fileRef.timeCreated,
            customMetadata:{
                "Video-tags": genre, // the actual new metadata field is the video genre. Will be used in conjuction with user tags later in code
                
            }
        };

        uploadTask.on('state_changed', (snapshot) => {// if file is uploaded this shows the progress in console.log
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        }, (error) => {
          console.log(error.message);
        }, async () => {
          console.log('success!!');
  
          try {
           
            // the url of the video that was added to the bucket is placed in a variable 
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const videosCollection = collection(db, 'videos');// reference tot he video bucket
            const newDocRef = doc(videosCollection);
  
            // Set document data
            await setDoc(newDocRef, {
              Title: title,
              username: username,
              genre: genre,
              videoUrl: downloadURL, // Use the downloadURL obtained earlier
              description: description
            }, {merge: true} );// if the doc already exists you can merge it 
            
            

  
            // Reset state variables to clear the fields
            setTitle('');
            // setUsername('');
            setGenre('');
            setFile(null);
            setUrl('');
            setDescription('')
  
            console.log('ADDED DOC');
          }
          catch (error) {
            console.error('ERROR WITH DOC ', error.message);
          }

          updateMetadata(fileRef, newMetadata)// update the metadata last
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
      <div className="Upload background">
        <form className="form">
        <label>
            USERNAME: {name}
             {/* the username in the doc is set to the Users name*/}
            {/* {()=>setUsername(username.concat(name))}  */}
          </label>

          <br />
          <label>
            VIDEO TITLE:
            {/* A text bar that sets the video title field to whatever you type*/}
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <br />
          <label>
            VIDEO DESCRIPTION:
                        {/* A text bar that sets the video description to whatever you type*/}

            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <br />
          
          <label>
            TAGS:
          {/* A series of buttons that sets all the tags. Upon clicking them they are added the genre field*/}

            { /* To be removed  */}
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
         
         {/* allows the user to set file from thier pc to uplaod*/}

          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <br />


        {/* THe handleclick function is called when the button is clicked*/}
          <button type="button" onClick={handleClick}>
            UPLOAD
          </button>
        </form>
      </div>
    );
  }
       

export default Uploader; 