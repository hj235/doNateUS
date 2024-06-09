// to be removed
import { useUserContext } from "./useUserContext";

export const login = () => {
    const { dispatch, setIsLoggedIn } = useUserContext();

    // save user data to local storage
    localStorage.setItem('user', JSON.stringify(data));

    // update the user context
    dispatch({type: 'LOGIN', payload: data});
    setIsLoggedIn(true);
}

export const logout = () => {
    const { dispatch, setIsLoggedIn } = useUserContext();

    // save user data to local storage
    localStorage.setItem('user', JSON.stringify(data));

    // update the user context
    dispatch({type: 'LOGOUT'});
    setIsLoggedIn(false);
}