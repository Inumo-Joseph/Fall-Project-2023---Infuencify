import { useState } from 'react';
import { auth, googleProvider } from './components/firebase-config'
import { createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth';

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async() =>{
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        } catch(err){
            console.error(err);
        }
        
    };

    const signInWithGoogle = async() =>{
        try{
            await signInWithPopup(auth, googleProvider);
        } catch(err){
            console.log(err);
        }
    };
    
    return(
        <div>
            <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)}>

            </input>
            <input placeholder="Password..." onChange={(e) => setPassword(e.target.value)} type='password'>
                
            </input>
            <button onClick={signIn}>Sing In</button>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
    );
}