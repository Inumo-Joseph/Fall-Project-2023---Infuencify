import { useState } from 'react';
import { auth, googleProvider } from './Config/firebase-config'
import { createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import './tailwind.css'

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
            <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} className='border border-black py-2 px-4 rounded-lg'>

            </input>
            <input placeholder="Password..." onChange={(e) => setPassword(e.target.value)} type='password' className='border border-black py-2 px-4 rounded-lg'>
                
            </input>
            <button onClick={signIn} className='border border-black py-2 px-4 rounded-lg'>Sing In</button>
            <button onClick={signInWithGoogle} className='border border-black py-2 px-4 rounded-lg'>Sign In With Google</button>
        </div>
    );
}