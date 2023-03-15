import React, { useState } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

export const Auth = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // console.log(auth?.currentUser?.photoURL);


    // regular email and password authentication
    const signIn = async () => {
        // using a try-catch block simply to handle errors
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err)
        }
    }

    // google authentication
    const signInWithGoogle = async () => {
        // using a try-catch block simply to handle errors
        try {
            await signInWithPopup(auth, googleProvider, password)
        } catch (err) {
            console.error(err)
        }
    }


    // logout function
    const logOut = async () => {
        // using a try-catch block simply to handle errors
        try {
            await signOut(auth)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <input 
                type="email" 
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Sign In</button>

            <button  onClick={signInWithGoogle}>Sign In With Google</button>

            <button  onClick={logOut}>Log Out</button>
        </div>
    )
}