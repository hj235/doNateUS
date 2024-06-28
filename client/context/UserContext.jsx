import { createContext, useReducer, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const userReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return { user: action.payload, userLoaded: true }
        case 'LOGOUT':
            return { user: null, userLoaded: true }
        default:
            return state
    }
}

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, {
        user: null,
        userLoaded: false,
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({type: 'LOGIN', payload: user});
        }
    }, []);

    console.log('UserContext state: ', state);
    console.log(state.user ? "Logged in as user: " + state.user.name : "Logged out");

    return (
        <UserContext.Provider value={{...state, dispatch }}>
            { children }
        </UserContext.Provider>
    )
}