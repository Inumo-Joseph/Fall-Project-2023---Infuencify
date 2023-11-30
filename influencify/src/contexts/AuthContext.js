import React, {useContext, useEffect, useId, useState} from 'react'
import {auth, db} from '../Config/firebase-config'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword as updatePasswordInAuth, updateProfile} from 'firebase/auth';
import { collection, addDoc, getDocs, where, query, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged} from "firebase/auth";

const AuthContext=React.createContext()
export function useAuth(){
    return useContext (AuthContext)
}// value returns the things we want from the authentication
export function AuthProvider({children}){
    const [currentUser, setCurrentUser]=useState()
    const [loading, setLoading]=useState(true)
    async function isDisplayNameUnique(displayName){
        const usersCollection=collection(db,'users');
        const q=query (usersCollection, where('displayName', '==', displayName));
        const querySnapshot= await getDocs(q);
        return querySnapshot.size===0;
    }
    
    async function signup(email, password, displayName){
        
       
        try{

            
            const isUnique=await isDisplayNameUnique(displayName);
            if(!isUnique)
            {
                throw new Error('Display name is not unique');
            }



            const userCredential=await createUserWithEmailAndPassword(auth, email, password);
            const userId=userCredential.user.uid;
            const user=userCredential.user;




            await updateProfile(userCredential.user, {displayName});

            const usersCollection=collection(db, 'users');
            const usersSnapshot=await getDocs(usersCollection);
            const userCount=usersSnapshot.size+1;

            const userDocRef= doc(usersCollection, `User${userCount}` );
            
            await setDoc(userDocRef, {
                email:user.email,
                displayName:user.displayName,
                password: password,
                UID: user.uid

            });

         


            return userCredential;

        } catch(error){
            console.error('Error creating account:', error);
            throw error;
        }
    
    }

    function login(email, password)
    {
       return  signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return signOut(auth);
    }

    function resetpassword(email)
    {
        return sendPasswordResetEmail(auth, email)
    }

    function updateemail(email){
        return currentUser.updateEmail(email)
    }
    function updatePassword(password)
    {
        
            return updatePasswordInAuth(currentUser, password)
        
    }

    function updateDisplayName(displayName){
        return updateProfile(auth.currentUser, {displayName})
    }
   useEffect(()=>{
    //function returns a method that when we call the method it will unsubscribe the on off auth state changed
    const unsubscribe=auth.onAuthStateChanged(user=>{
        setCurrentUser(user)
        setLoading(false)//did verification with the user 
        setCurrentUser(user)
    })

    return unsubscribe

   },[])

    const value={
        currentUser,
        signup,
        login,
        logout,
        resetpassword,
        updateemail,
        updatePassword,
        updateDisplayName
    }


    return(
        <AuthContext.Provider value={value}>
            {!loading&&children}
        </AuthContext.Provider>
    )
    }