import { createContext, useReducer, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const userReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, {
        user: null
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({type: 'LOGIN', payload: user});
            setIsLoggedIn(true);
        }
    }, []);

    console.log('UserContext state: ', state);
    console.log('Logged in: ', isLoggedIn);

    return (
        <UserContext.Provider value={{...state, dispatch, isLoggedIn, setIsLoggedIn }}>
            { children }
        </UserContext.Provider>
    )
}