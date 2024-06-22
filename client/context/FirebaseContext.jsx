import { createContext, useReducer, useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, ref } from 'firebase/storage';
const dotenv = require('dotenv').config();

export const FirebaseContext = createContext(null);

export const FirebaseContextProvider = ({children}) => {
    const app = initializeApp(JSON.parse(process.env.FIREBASECONFIGS));
    const storage = getStorage(app);
    const storageRef = ref(storage);

    const mediaRef = ref(storage, 'media');
   
    console.log('FirebaseContext loaded');
    console.log(mediaRef ? 'mediaRef: ' + mediaRef : 'mediaRef not loaded');
   
    return (
        <FirebaseContext.Provider value={{ app, storage, storageRef, mediaRef }}>
            { children }
        </FirebaseContext.Provider>
    )

}