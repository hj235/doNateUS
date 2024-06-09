import { createContext, useReducer, useState } from 'react';

export const UserContext = createContext(null);

// export const userReducer = (state, action) => {
//     switch(action.type) {
//         case 'LOGIN':
//             return { user: action.payload };
//         case 'LOGOUT':
//             return { user: null };
//         default:
//             return state;
//     }
// }

export const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (user) => {
        setUserInfo(user);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setUserInfo(null);
        setIsLoggedIn(false);
    };

    const value = {
        userInfo,
        setUserInfo,
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout
    };

    // const [state, dispatch] = useReducer(userReducer, {
    //     user: null
    // })

    // console.log('UserContext state: ', state);

    return (
        <UserContext.Provider value={ value }>
            { children }
        </UserContext.Provider>
    );
};