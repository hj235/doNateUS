import { createContext, useReducer, useState, useEffect } from 'react';
import axios from 'axios';

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
            const validateUser = async () => {
                const response = await axios.get(`/api/user/get/${user._id}`);
                if (response.status === 200) {
                    dispatch({type: 'LOGIN', payload: response.data});
                    // localStorage.setItem('user', response.data);
                } else {
                    console.log('error retrieving previous logged in user');
                    localStorage.removeItem('user');
                    dispatch({type: 'LOGOUT'});
                }
            }

            validateUser();
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