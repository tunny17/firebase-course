import React, { useState } from 'react'
import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export const Auth = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const signIn = async () => {
        // using a try-catch block simply to handle errors
        try {
            await createUserWithEmailAndPassword(auth, email, password)
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
        </div>
    )
}