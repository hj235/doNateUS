import { FirebaseContext } from "../context/FirebaseContext";
import { useContext } from "react";

export const useFirebaseContext = () => {
    const context = useContext(FirebaseContext);

    if (!context) {
        throw Error('useFirebaseContext must be used inside an FirebaseContextProvider');
    }

    return context;
}