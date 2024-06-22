import React from 'react';
import { createContext } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, ref } from 'firebase/storage';

const firebaseConfigs = {
    apiKey: "AIzaSyDj2r6AFtPgQn9VcDrUnM5a4vkElgZfwFw",
    authDomain: "donateus-60fbb.firebaseapp.com",
    projectId: "donateus-60fbb",
    storageBucket: "donateus-60fbb.appspot.com",
    messagingSenderId: "1055579610284",
    appId: "1:1055579610284:web:1a2b3c95bd39e316be1309",
    measurementId: "G-QWL0CG1KX8"
}

export const FirebaseContext = createContext(null);

export const FirebaseContextProvider = ({children}) => {
    const app = initializeApp(firebaseConfigs);
    const storage = getStorage(app);
    const storageRef = ref(storage);

    const mediaRef = ref(storage, 'media');
   
    console.log('FirebaseContext loaded');
    console.log(mediaRef ? 'mediaRef: ' + mediaRef : 'mediaRef not loaded');
   
    return (
        <FirebaseContext.Provider value={{ app, storage, storageRef, mediaRef }}>
            { children }
        </FirebaseContext.Provider>
    );
}